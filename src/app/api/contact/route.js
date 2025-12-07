import { NextResponse } from 'next/server'
import { airtableClient } from '../../lib/airtable'

export async function POST(request) {
    try {
        const contentType = request.headers.get('content-type')
        let formData
        
        if (contentType && contentType.includes('multipart/form-data')) {
            // Handle FormData
            const formDataObj = await request.formData()
            formData = {}
            
            // Convert FormData to object
            for (const [key, value] of formDataObj.entries()) {
                if (key.endsWith('[]')) {
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

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'message']
        const missingFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '')
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Missing required fields: ${missingFields.join(', ')}`,
                },
                { status: 400 }
            )
        }

        // Prepare data for Airtable - only include fields that exist in the table
        const recordData = {
            'First Name': formData.firstName?.trim() || '',
            'Last Name': formData.lastName?.trim() || '',
            'Email': formData.email?.trim() || '',
            'Message': formData.message?.trim() || '',
        }

        // Create record in Airtable
        const record = await airtableClient('Contact').create(recordData)

        return NextResponse.json({
            success: true,
            recordId: record.id,
            message: 'Contact form submitted successfully! We\'ll get back to you soon.',
        })
    } catch (error) {
        console.error('API: Error submitting contact form:', error)

        // Return user-friendly error message
        let errorMessage = 'There was an error submitting your contact form. Please try again.'

        if (error.message?.includes('AUTHENTICATION_REQUIRED')) {
            errorMessage = 'Configuration error. Please contact support.'
        } else if (error.message?.includes('NOT_FOUND')) {
            errorMessage = 'Database configuration error. Please contact support.'
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
