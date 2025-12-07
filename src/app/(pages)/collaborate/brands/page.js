import Image from 'next/image'
import { RequestPricing } from '../../../components'
import { getProducts } from '../../../actions/shopify'
import { BrandsPageClient } from './BrandsPageClient'

const BrandsCollaboratePage = async () => {
    let products = []

    try {
        const productsResult = await getProducts()
        products =
            productsResult.success && productsResult.data
                ? productsResult.data.products
                : []
    } catch (error) {
        console.error('Error fetching products:', error)
        products = []
    }
    return (
        <main className="nomadory-container">
            <section>
                <h1 className="text-3.5xl text-center font-cormorant-garamond mb-20 md:mb-24">
                    Crafted in partnership. Designed for your vision.
                </h1>
                <div className="flex md:flex-row flex-col md:gap-32 gap-6">
                    <div className="order-2 md:order-1">
                        <Image
                            src="/images/threads-macro.png"
                            alt="Threads Macro"
                            width={800}
                            height={900}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    <div className="max-w-[464px] order-1 md:order-2">
                        <h1 className="heading-1 mb-8 md:mb-16 max-w-[307px] md:max-w-auto">
                            Collaborate with Us
                        </h1>
                        <p className="body-default md:mb-20 ml-[105px] md:ml-0 text-justify">
                            At Nomadory, we help brands and the architect and
                            designer community bring their ideas to life through
                            ethical, transparent, and expertly crafted rug
                            production. Whether you&apos;re launching your own
                            white-label collection or seeking bespoke pieces for
                            your projects, we offer a seamless, end-to-end
                            solution tailored to you.
                        </p>
                        <RequestPricing
                            label="Start Your Project"
                            products={products}
                            params={{ defaultClientType: 'brand' }}
                        />
                    </div>
                </div>
            </section>

            <div className="h-20 md:h-40"></div>
            <BrandsPageClient products={products} />
            <div className="h-20 md:h-40"></div>
            <section className="flex items-center gap-32">
                <div className="md:min-w-[400px]">
                    <Image
                        src="/images/artisian-working-rug.webp"
                        alt="Team Meeting"
                        width={400}
                        height={632}
                        className="object-cover w-full h-full"
                    />
                </div>
                <div>
                    <h1 className="heading-1 mb-16">Why Nomadory</h1>
                    <div className="flex flex-wrap gap-12">
                        <div>
                            <h3 className="text-3.5xl font-cormorant-garamond mb-12">
                                Bespoke Partnership
                            </h3>
                            <div className="max-w-[304px] body-default text-justify">
                                Flexible programs for single custom pieces or
                                entire collections.
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3.5xl font-cormorant-garamond mb-12">
                                Transparent Production
                            </h3>
                            <div className="max-w-[304px] body-default text-justify">
                                Traceable supply chains, fair wages, and ethical
                                sourcing.
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3.5xl font-cormorant-garamond mb-12">
                                Expert Craftsmanship
                            </h3>
                            <div className="max-w-[304px] body-default text-justify">
                                Each rug is a bridge: between cultures, between
                                maker and home, between past and present
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3.5xl font-cormorant-garamond mb-12">
                                Seamless Process
                            </h3>
                            <div className="max-w-[304px] body-default text-justify">
                                Each rug is a bridge: between cultures, between
                                maker and home, between past and present
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="h-20 md:h-40"></div>
            <section className="flex flex-col md:flex-row gap-6 md:gap-32">
                <div>
                    <h1 className="heading-1 mb-16">Who We Partner With</h1>
                    <div className="space-y-6 md:space-y-12">
                        <div className="space-y-6 md:space-y-12">
                            <h3 className="text-2xl tracking-wider max-w-[441px]">
                                Architect and Designer Community
                            </h3>
                            <div className="body-default max-w-[374px]">
                                Elevate your projects with custom rugs that
                                reflect your client’s aesthetic, with production
                                you can trust.
                            </div>
                        </div>
                        <div className="space-y-6 md:space-y-12">
                            <h3 className="text-2xl tracking-wider max-w-[441px]">
                                Brands & Retailers
                            </h3>
                            <div className="body-default max-w-[374px]">
                                Develop your own curated or white-label rug
                                collection with full visibility into design,
                                production, and logistics.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src="/images/meeting-room-rug.png"
                        alt="Threads Macro"
                        width={587}
                        height={548}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
            </section>

            <div className="h-20 md:h-40"></div>
            <section>
                <h1 className="heading-1 text-center mb-6 md:mb-12">
                    Let’s Build Something Together
                </h1>
                <p className="body-default text-center mb-20 max-w-[1106px] mx-auto">
                    Whether you’re part of the architect and designer community
                    looking for that perfect one-of-a-kind piece, or a brand
                    ready to launch your own collection, we’re here to make it
                    happen—beautifully and responsibly.
                </p>
                <div className="flex justify-center">
                    <RequestPricing
                        label="Let's Create Together"
                        products={products}
                        params={{ defaultClientType: 'brand' }}
                    />
                </div>
            </section>
            <div className="h-20 md:h-40"></div>
        </main>
    )
}
export default BrandsCollaboratePage
