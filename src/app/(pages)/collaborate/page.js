import Image from 'next/image'
import Link from 'next/link'
import { RequestPricing } from '../../components'
import { getProducts } from '../../actions/shopify'

const Collaborate = async () => {
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
            <div className="flex flex-col md:flex-row gap-6  lg:gap-32 w-full">
                <div className="max-w-[402px] lg:ml-[62px] order-2 md:order-1">
                    <h1 className="heading-1 mb-8 md:mb-16 md:max-w-[293px]">
                        Let&apos;s collaborate
                    </h1>
                    <p className="heading-2 text-center md:text-left mb-8 md:mb-20">
                        We work with designers and brands to create pieces with
                        meaning, intention, and craftsmanship.
                    </p>
                    <div className="space-y-6 md:space-y-8">
                        <Link
                            href="/collaborate/trade"
                            className="btn-brand-primary w-full max-w-[358px]"
                        >
                            For Designers
                        </Link>
                        <Link
                            href="/collaborate/brands"
                            className="btn text-white hover:bg-nomadory-secondary transition-all ease-out duration-700 bg-nomadory-secondary/30 w-full max-w-[358px]"
                        >
                            For Brands
                        </Link>
                    </div>
                </div>
                <div className="w-full order-1 md:order-2">
                    <Image
                        src="/images/loom-hands-weaving.webp"
                        alt="Hands working on a traditional loom with red threads"
                        width={800}
                        height={900}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
            </div>
            <div className="md:h-40 h-20"></div>
            <div>
                <h2 className="heading-1 mb-20 md:max-w-[552px]">
                    Not sure where to start? Let&apos;s Talk
                </h2>
                <RequestPricing
                    label="Request a Quote"
                    products={products}
                    params={{}}
                />
            </div>
            <div className="md:h-40 h-20"></div>
        </main>
    )
}

export default Collaborate
