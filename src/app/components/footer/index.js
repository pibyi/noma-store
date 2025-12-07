'use client'
import { LogoRounded } from '../logo/LogoRounded'
import { ArrowRightIcon } from '../../icons/ArrowRight'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { NotificationModal } from '../NotificationModal'

const Footer = () => {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalType, setModalType] = useState('success')

    const links = [
        {
            label: 'About',
            href: '/about',
        },
        {
            label: 'Collaborate',
            href: '/collaborate',
        },
        {
            label: 'Care Instructions',
            href: '/care-instructions',
        },
        {
            label: 'FAQ',
            href: '/frequently-asked-questions',
        },
        {
            label: 'Contact us',
            href: '/contacts',
        },
    ]
    const privacyLinks = [
        {
            label: 'Privacy policy',
            href: '/privacy-policy',
        },
        {
            label: 'Terms & Condition',
            href: '/terms-and-condition',
        },
    ]
    const social = [
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/nomadory/',
        },
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/nomadory/',
        },
    ]

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setModalMessage('Please enter your email address')
            setModalType('error')
            setModalVisible(true)
            return
        }

        setIsSubmitting(true)

        try {
            const response = await axios.post('/api/newsletter', { email })

            if (response.data.success) {
                setModalMessage('Subscribed to newsletter')
                setModalType('success')
                setEmail('') // Clear the input
            } else {
                setModalMessage(response.data.error || 'Failed to subscribe')
                setModalType('error')
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error)
            setModalMessage(
                error.response?.data?.error ||
                'Failed to subscribe to newsletter. Please try again.'
            )
            setModalType('error')
        } finally {
            setIsSubmitting(false)
            setModalVisible(true)
        }
    }

    return (
        <footer className="p-4 md:p-6">
            <div className="md:flex items-center md:gap-16 mb-16">
                <div className="flex items-center justify-center flex-col md:flex-row gap-6 md:gap-[120px] mb-12 md:mb-0">
                    <div>
                        <LogoRounded />
                    </div>
                    <h3 className="text-nomadory-primary font-normal text-5xl md:text-[56px] font-cormorant-garamond">
                        Join Our World
                    </h3>
                </div>
                <form
                    onSubmit={handleNewsletterSubmit}
                    className="relative h-12 mb-12 md:mb-0 w-full md:max-w-[410px]"
                >
                    <input
                        className="text-sm pb-4 text-nomadory-primary placeholder:text-nomadory-primary/30 border-b border-b-nomadory-primary/30 w-full focus:outline-none focus:border-b-nomadory-primary"
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        className="absolute right-0 top-2.5 cursor-pointer hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <ArrowRightIcon />
                    </button>
                </form>
            </div>
            <div className="flex justify-between mb-12 md:mb-16 max-w-[984px] mx-auto">
                <div className="space-y-4 md:space-y-6">
                    {links.map((link) => (
                        <Link
                            className="block text-sm text-nomadory-primary hover:text-nomadory-primary/50 transition-colors duration-200"
                            key={link.label}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="space-y-5 md:space-y-6">
                    {privacyLinks.map((item) => (
                        <Link
                            className="block text-sm text-nomadory-primary hover:text-nomadory-primary/50 transition-colors duration-200"
                            key={item.label}
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="md:flex justify-between max-w-[1188px] md:pb-6">
                <div className="flex gap-8 mb-12 md:mb-0 order-2">
                    {social.map((item) => (
                        <div key={item.label} className="relative">
                            <Link
                                className="text-sm relative inline-block underline text-nomadory-primary hover:text-nomadory-primary/50 transition-colors duration-200"
                                href={item.href}
                                target="_blank"
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="order-1">
                    &copy; Nomadory {new Date().getFullYear()}
                </div>
            </div>

            {/* Newsletter Subscription Modal */}
            <NotificationModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                message={modalMessage}
                type={modalType}
            />
        </footer>
    )
}

export { Footer }
