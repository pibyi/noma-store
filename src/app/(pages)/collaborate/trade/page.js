import { CraftedSpaces } from '../../../sections'
import Image from 'next/image'
import { RequestPricing } from '../../../components'
import { getProducts } from '../../../actions/shopify'
import { TradePageClient } from './TradePageClient'

const CollaborateTradePage = async () => {
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
                <div className="max-w-[412px] lg:ml-[52px]">
                    <h1 className="heading-1 mb-8 md:mb-16">Design with us</h1>
                    <p className="heading-2 text-left md:ml-0 ml-[84px] md:text-justify mb-8 md:mb-20">
                        We collaborate with interior designers and design
                        studios to bring visions to life through timeless,
                        custom-made rugs rooted in craftsmanship
                    </p>
                    <RequestPricing
                        products={products}
                        params={{ defaultClientType: 'trade-partner' }}
                    />
                </div>
                <div className="w-full">
                    <Image
                        src="/images/process-storage-rols.png"
                        alt="Hands working on a traditional loom with red threads"
                        width={800}
                        height={900}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
            </div>
            <div className="md:h-40 h-20"></div>
            <TradePageClient products={products} />
            <div className="md:h-40 h-20"></div>
            <CraftedSpaces />
            <div className="md:h-40 h-20"></div>
        </main>
    )
}

export default CollaborateTradePage
