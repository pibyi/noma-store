'use client'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { ArrowRoundedRight } from '../../icons'
import { TextInput } from '../../components/TextInput'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            message: '',
        },
    })

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await axios.post('/api/contact', data)

            if (response.data.success) {
                setSubmitStatus({
                    type: 'success',
                    message: response.data.message,
                })
                reset() // Reset form after successful submission

                // Redirect to thank-you page after a short delay
                setTimeout(() => {
                    router.push('/thank-you')
                }, 1500)
            } else {
                setSubmitStatus({ type: 'error', message: response.data.error })
            }
        } catch (error) {
            console.error('Contact form error:', error)
            setSubmitStatus({
                type: 'error',
                message:
                    error.response?.data?.error ||
                    'An error occurred. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="nomadory-container mb-20 md:mb-40">
            <section className="flex justify-between flex-col md:flex-row">
                <div className="max-w-[390px] mb-20 md:mb-0">
                    <div>
                        <h1 className="heading-1 mb-8 md:mb-16">Contact Us</h1>
                        <p className="body-default">
                            We&apos;d love to hear from you
                            <br />
                            <br />
                            Whether you have a question about our collections,
                            want to discuss a custom design, or just want to
                            connect—we&apos;re here to help
                            <br />
                            <br />
                            Or reach us directly:
                            <br />
                            E-mail: hello@nomadory.com
                            <br />
                            Our team is available to chat from 8 AM to 5 PM CET,
                            Monday through Friday
                        </p>
                    </div>
                </div>

                <div className="relative max-w-[800px] space-y-20 md:space-y-40">
                    <div className="relative hidden md:block">
                        <Image
                            src="/images/contact-weaving-hands.png"
                            alt="Close-up of hands weaving a rug with red garment"
                            width={800}
                            height={900}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    {submitStatus && submitStatus?.type !== 'success' && (
                        <div className="p-4 rounded bg-red-100 text-red-800 border border-red-200">
                            {submitStatus?.message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-12"
                    >
                        <div className="flex max-w-[664px] md:gap-12 gap-[18px]">
                            <TextInput
                                name="firstName"
                                control={control}
                                label="First name"
                                placeholder="Enter your name"
                                required={true}
                                rules={{
                                    required: 'First name is required',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'First name must be at least 2 characters',
                                    },
                                }}
                                className="w-full"
                            />
                            <TextInput
                                name="lastName"
                                control={control}
                                label="Last Name"
                                placeholder="Enter your last name"
                                required={true}
                                rules={{
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Last name must be at least 2 characters',
                                    },
                                }}
                                className="w-full"
                            />
                        </div>

                        <TextInput
                            name="email"
                            control={control}
                            label="E-mail"
                            placeholder="yourname@email.com"
                            type="email"
                            required={true}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            }}
                            className="space-y-2"
                        />

                        <TextInput
                            name="message"
                            control={control}
                            label="Message"
                            placeholder="Feel free to share your questions, ideas, or custom rug needs"
                            rows={6}
                            required={true}
                            rules={{
                                required: 'Message is required',
                                minLength: {
                                    value: 10,
                                    message:
                                        'Message must be at least 10 characters',
                                },
                            }}
                            className="space-y-2"
                        />

                        <div className="pt-4 ">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-brand-secondary ml-auto md:ml-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'SENDING...' : 'SEND NOW'}
                                <div>
                                    <ArrowRoundedRight color="white" />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default ContactPage
