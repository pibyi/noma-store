'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRoundedRight } from './icons'

const links = [
    { label: 'Return Home', href: '/', showArrow: true },
    { label: 'Shop Rugs', href: '/rugs' },
    { label: 'About us', href: '/about' },
    { label: 'Contacts', href: '/contacts' },
]

const Error = ({ error, reset }) => {
    return (
        <>
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row md:gap-24 gap-6">
                    <div className="max-w-[304px] mx-auto md:mx-0 md:max-w-[490px]">
                        <h1 className="heading-1 mb-8 md:mb-16 text-black text-center md:text-left">
                            A Thread Came Loose
                        </h1>
                        <h2 className="text-lg mb-6 md:mb-12 text-black text-center md:text-left">
                            Something unexpected happened on our end. Don't
                            worry—we're working to fix it. <br /> Try again or
                            return to browsing our beautiful collection.
                        </h2>

                        <div className="space-y-6 hidden md:block">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 cursor-pointer text-lg font-normal ${
                                        link.showArrow ? 'group' : ''
                                    }`}
                                >
                                    <span className="text-lg font-normal">
                                        {link.label}
                                    </span>
                                    {link.showArrow && (
                                        <div className="transition-all ease-in-out group-hover:scale-125">
                                            <ArrowRoundedRight />
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full max-w-[800px]">
                        <Image
                            src="/images/yarn-rolls-404.png"
                            alt="Server error - Yarn rolls"
                            height={900}
                            width={800}
                        />
                    </div>
                </div>
                <div className="block md:hidden">
                    <div className="mb-6 text-center">
                        <button
                            onClick={reset}
                            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                    <div className="space-y-6 max-w-[178px] mx-auto">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 cursor-pointer text-lg font-normal ${
                                    link.showArrow ? 'group' : ''
                                }`}
                            >
                                <span className="text-lg font-normal">
                                    {link.label}
                                </span>
                                {link.showArrow && (
                                    <div className="transition-all ease-in-out group-hover:scale-125">
                                        <ArrowRoundedRight />
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-20 md:h-40" />
        </>
    )
}

export default Error
