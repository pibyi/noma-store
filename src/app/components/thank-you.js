import Link from 'next/link'
import { ArrowRoundedRight } from '../icons'
import Image from 'next/image'

const Thankyou = () => {
    const links = [
        { label: 'Shop Our Collection', href: '/rugs', showArrow: true },
        { label: 'Learn About Our Process', href: '/the-makers' },
        { label: 'Read Our Story', href: '/about' },
    ]
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-32">
                <div>
                    <h1 className="heading-1 mb-8 md:mb-16 max-w-[329px]">
                        Thank You for Reaching Out
                    </h1>
                    <div className="body-default max-w-[619px]">
                        We&apos;ve received your message and will be in touch
                        soon.Our team typically replies within 1–2 business
                        days. If your inquiry is urgent, please feel free to
                        email us directly at hello@nomadory.com.In the meantime,
                        feel free to explore:
                    </div>
                    <div className="space-y-6 block my-12">
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
                    <div className="body-default">
                        We look forward to connecting with you.
                    </div>
                </div>
                <div>
                    <Image
                        src="/images/workspace-interior-rug.png"
                        alt="Workspace interior rug"
                        width={405}
                        height={487}
                    />
                </div>
            </div>
        </div>
    )
}
export { Thankyou }
