import { NextResponse } from 'next/server'
import axios from 'axios'

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
                formData[key] = value
            }
        } else {
            // Handle JSON
            formData = await request.json()
        }

        // Validate required fields
        if (!formData.email || !formData.email.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Email is required',
                },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        if (!emailRegex.test(formData.email.trim())) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Please enter a valid email address',
                },
                { status: 400 }
            )
        }

        // Subscribe to MailerLite
        const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN
        const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

        if (!MAILERLITE_API_TOKEN || !MAILERLITE_GROUP_ID) {
            console.error(
                '[API_NEWSLETTER_ERROR] Missing MailerLite credentials'
            )
            return NextResponse.json(
                {
                    success: false,
                    error: 'Newsletter service is temporarily unavailable',
                },
                { status: 503 }
            )
        }

        const response = await axios.post(
            'https://connect.mailerlite.com/api/subscribers',
            {
                email: formData.email.trim(),
                groups: [MAILERLITE_GROUP_ID],
                status: 'active',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
                },
            }
        )

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed to newsletter!',
        })
    } catch (error) {
        console.error(
            '[API_NEWSLETTER_ERROR]',
            error.response?.data || error.message
        )

        // Handle duplicate email error (MailerLite returns this when email already exists)
        if (error.response?.status === 422 || error.response?.status === 409) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'This email is already subscribed to our newsletter',
                },
                { status: 409 }
            )
        }

        // Handle authentication error
        if (error.response?.status === 401) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Newsletter service is temporarily unavailable',
                },
                { status: 503 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to subscribe to newsletter. Please try again.',
                debug:
                    process.env.NODE_ENV === 'development'
                        ? error.response?.data?.message || error.message
                        : undefined,
            },
            { status: error.response?.status || 500 }
        )
    }
}
