import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                <h1 className="font-cormorant-garamond leading-[80px] md:leading-[110px] text-[44px] md:text-7xl uppercase max-w-[620px]">
                    Woven by hand Rooted in soul
                </h1>
                <div className="self-end md:self-start  text-right heading-2 max-w-[360px] w-full mt-2.5">
                    We are a manufacturer of <br /> handmade artisan rugs
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-10 mt-5 md:mt-12">
                <Link
                    href="/rugs"
                    className="flex flex-col justify-end w-full md:w-[25.71%] md:order-1 order-2"
                >
                    <div className="btn btn-brand-primary md:max-w-[358px] w-full">
                        Explore Our Rugs
                    </div>
                </Link>
                <div className="max-w-[800px] h-auto w-full md:w-[57.48%] order-1 md:order-2">
                    <Image
                        src="/images/Process-artisian-tufting.png"
                        alt="Explore our Rugs"
                        width={800}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export { HeroSection }
