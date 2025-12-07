import Image from 'next/image'
import Link from 'next/link'
import { ArrowRoundedRight } from '../../icons'

const Anonymous = () => {
    return (
        <>
            <section className="flex flex-col md:flex-row gap-8 md:gap-32">
                <div className="w-full max-w-[800px] order-2 md:order-1">
                    <Image
                        src="/images/artisians-trimming-rug.png"
                        alt="Our Makers"
                        width={800}
                        height={900}
                        className="object-cover w-full h-auto"
                    />
                </div>
                <div className="max-w-[438px] order-1 md:order-2">
                    <h1 className="heading-1 mb-8 md:mb-16">
                        Anonymous, But Recognized
                    </h1>
                    <div className="body-default md:heading-2 text-justify">
                        We protect our makers’ privacy, but their work speaks
                        for itself — each rug a testament to their skill and
                        pride. We’re honoured to share their legacy in every
                        piece you bring home
                    </div>
                </div>
            </section>
            <div className="h-20 md:h-40" />
            <section>
                <h1 className="text-5xl font-cormorant-garamond mb-16 text-center">
                    “Every knot is a heartbeat of tradition and care”
                </h1>
                <div>
                    <Link href="/rugs" className="btn-brand-secondary">
                        SEE THEIR WORKS <ArrowRoundedRight />
                    </Link>
                </div>
            </section>
            <div className="h-20 md:h-40" />
        </>
    )
}
export { Anonymous }
