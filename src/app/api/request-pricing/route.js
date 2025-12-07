import { NextResponse } from 'next/server'
import { airtableClient } from '../../lib/airtable'

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Environment validation
function validateEnvironment() {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
        throw new Error('Missing required environment variables')
    }
}

// Basic input validation
function validateFormData(formData) {
    const errors = []

    // Required fields
    if (!formData.aboutYou) errors.push('Client type')
    if (!formData.firstName) errors.push('First name')
    if (!formData.lastName) errors.push('Last name')
    if (!formData.email) errors.push('Email')
    if (!formData.collaboration) errors.push('Collaboration description')
    if (!formData.projectVision) errors.push('Project vision')

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Valid email address')
    }

    return errors
}

async function getFieldId(baseId, tableName, fieldName) {
    try {
        const apiKey = process.env.AIRTABLE_ACCESS_TOKEN
        if (!apiKey) {
            throw new Error('AIRTABLE_ACCESS_TOKEN not configured')
        }

        const metaUrl = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`

        const response = await fetch(metaUrl, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            signal: AbortSignal.timeout(10000), // 10 second timeout
        })

        if (!response.ok) {
            throw new Error(`Airtable API error: ${response.status}`)
        }

        const data = await response.json()
        const table = data.tables.find((t) => t.name === tableName)
        if (table) {
            const field = table.fields.find((f) => f.name === fieldName)
            if (field) {
                return field.id
            }
        }

        return fieldName
    } catch (error) {
        console.error('Error in getFieldId:', error.message)
        return fieldName
    }
}

async function uploadToAirtable(file, baseId, recordId, attachmentFieldId) {
    try {
        const apiKey = process.env.AIRTABLE_ACCESS_TOKEN
        if (!apiKey) {
            throw new Error('AIRTABLE_ACCESS_TOKEN not configured')
        }

        // Basic file validation
        if (!file || !file.name || !file.size) {
            throw new Error('Invalid file object')
        }

        if (file.size > MAX_FILE_SIZE) {
            throw new Error('File size exceeds 5MB limit')
        }

        const fieldId = await getFieldId(
            baseId,
            'Request Pricing',
            attachmentFieldId
        )

        let fileBuffer
        if (file.arrayBuffer) {
            fileBuffer = await file.arrayBuffer()
        } else if (file.buffer) {
            fileBuffer = file.buffer
        } else {
            throw new Error('Unsupported file format')
        }

        const base64File = Buffer.isBuffer(fileBuffer)
            ? fileBuffer.toString('base64')
            : Buffer.from(fileBuffer).toString('base64')

        const jsonPayload = {
            contentType: file.type || 'text/plain',
            file: base64File,
            filename: file.name || 'uploaded-file',
        }

        const uploadUrl = `https://content.airtable.com/v0/${baseId}/${recordId}/${fieldId}/uploadAttachment`

        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonPayload),
            signal: AbortSignal.timeout(30000), // 30 second timeout for file upload
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Airtable upload failed: ${response.status}`)
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error('Airtable upload failed:', error.message)
        throw error
    }
}

export async function POST(request) {
    try {
        // Validate environment
        validateEnvironment()

        const contentType = request.headers.get('content-type')
        let formData

        if (contentType && contentType.includes('multipart/form-data')) {
            const formDataObj = await request.formData()
            formData = {}

            for (const [key, value] of formDataObj.entries()) {
                if (key === 'files') {
                    if (!formData.files) formData.files = []
                    formData.files.push(value)
                } else if (key.endsWith('[]')) {
                    // Handle array fields
                    const arrayKey = key.slice(0, -2)
                    if (!formData[arrayKey]) formData[arrayKey] = []
                    formData[arrayKey].push(value)
                } else {
                    formData[key] = value
                }
            }
        } else {
            // Handle JSON
            formData = await request.json()
        }

        // Validate form data
        const validationErrors = validateFormData(formData)
        if (validationErrors.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Missing required fields: ${validationErrors.join(', ')}`,
                },
                { status: 400 }
            )
        }

        const mapClientType = (formValue) => {
            const clientTypeMap = {
                'private-client': 'Private',
                'trade-partner': 'Trade',
                brand: 'Brand',
            }
            return clientTypeMap[formValue] || formValue
        }

        let processedProducts = []
        let useLinkedRecords = true

        if (formData.products && formData.products.length > 0) {
            processedProducts = formData.products.map((p) => {
                if (typeof p === 'string' && p.startsWith('rec')) {
                    return p
                }
                if (typeof p === 'object' && p.id) {
                    return p.id
                }
                useLinkedRecords = false
                return p
            })
        }

        const recordData = {
            'Type of Client': formData.aboutYou
                ? [mapClientType(formData.aboutYou)]
                : [],
            'First Name': formData.firstName?.trim() || '',
            'Last Name': formData.lastName?.trim() || '',
            'Company Name': formData.companyName?.trim() || '',
            'Requested Products': useLinkedRecords
                ? processedProducts
                : processedProducts.join(', '),
            Email: formData.email?.trim() || '',
            Phone: formData.phoneNumber
                ? `${formData.phoneCountry || ''} ${formData.phoneNumber}`.trim()
                : '',
            Location:
                formData.locationCity && formData.locationCountry
                    ? `${formData.locationCity}, ${formData.locationCountry}`
                    : formData.locationCity || formData.locationCountry || '',
            'Collaboration Description': formData.collaboration?.trim() || '',
            'Project Vision': formData.projectVision?.trim() || '',
            'Estimated start date':
                formData.estimateTimeline &&
                formData.estimateTimeline !== 'null'
                    ? formData.estimateTimeline
                    : '',
            'Budget Range': formData.budgetRange?.trim() || '',
        }

        const record =
            await airtableClient('Request Pricing').create(recordData)

        // Upload files directly to Airtable if any files exist
        let uploadedAttachments = 0
        if (formData.files && formData.files.length > 0) {
            try {
                const attachmentFieldId = 'Attachments'

                for (const file of formData.files) {
                    try {
                        if (file.size > 5 * 1024 * 1024) {
                            continue
                        }

                        await uploadToAirtable(
                            file,
                            process.env.AIRTABLE_BASE_ID,
                            record.id,
                            attachmentFieldId
                        )

                        uploadedAttachments++
                    } catch (fileError) {
                        console.error(
                            `Failed to upload file ${file.name}:`,
                            fileError.message
                        )
                    }
                }
            } catch (uploadError) {
                console.error(
                    'File upload process failed:',
                    uploadError.message
                )
            }
        }

        const response = NextResponse.json({
            success: true,
            recordId: record.id,
            uploadedFiles: uploadedAttachments,
            totalFiles: formData.files ? formData.files.length : 0,
            message:
                uploadedAttachments > 0
                    ? `Request submitted successfully with ${uploadedAttachments} file(s) uploaded! We'll be in touch soon.`
                    : formData.files && formData.files.length > 0
                      ? `Request submitted successfully. Some files could not be uploaded. We'll be in touch soon.`
                      : "Request submitted successfully! We'll be in touch soon.",
        })

        // Add security headers
        response.headers.set('X-Content-Type-Options', 'nosniff')
        response.headers.set('X-Frame-Options', 'DENY')
        response.headers.set('X-XSS-Protection', '1; mode=block')

        return response
    } catch (error) {
        console.error('API: Error submitting to Airtable:', error)

        let errorMessage =
            'There was an error submitting your request. Please try again.'

        if (error.message?.includes('AUTHENTICATION_REQUIRED')) {
            errorMessage = 'Configuration error. Please contact support.'
        } else if (error.message?.includes('NOT_FOUND')) {
            errorMessage =
                'Database configuration error. Please contact support.'
        } else if (error.message?.includes('INVALID_REQUEST')) {
            errorMessage = 'Please check your information and try again.'
        }

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
                details:
                    process.env.NODE_ENV === 'development'
                        ? error.message
                        : undefined,
            },
            { status: 500 }
        )
    }
}
