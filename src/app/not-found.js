import Image from 'next/image'
import Link from 'next/link'
import { ArrowRoundedRight } from './icons'

const links = [
    { label: 'Return Home', href: '/', showArrow: true },
    { label: 'Shop Rugs', href: '/rugs' },
    { label: 'About us', href: '/about' },
    { label: 'Contacts', href: '/contacts' },
]

const NotFound = () => {
    return (
        <>
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row md:gap-24 gap-6">
                    <div className="max-w-[304px] mx-auto md:mx-0 md:max-w-[490px]">
                        <h1 className="heading-1 mb-8 md:mb-16 text-black text-center md:text-left">
                            Lost in the Weave ?
                        </h1>
                        <h2 className="text-lg mb-0 md:mb-20 text-black text-center md:text-left">
                            We couldn’t find the page you’re looking for. <br />{' '}
                            But don’t worry—we’re here to guide you back to
                            beautiful design and craftsmanship.
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
                            alt="Page not found - Yarn rolls"
                            height={900}
                            width={800}
                        />
                    </div>
                </div>
                <div className="space-y-6 block md:hidden max-w-[178px] mx-auto mt-10">
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
            <div className="h-20 md:h-40" />
        </>
    )
}

export default NotFound
