import { ArrowRoundedRight } from '../../icons'
import Link from 'next/link'
import Image from 'next/image'
import { getProductsByCollection } from '../../actions/shopify'

const ProductGallery = async () => {
    let products = []

    try {
        const result = await getProductsByCollection('featured')

        if (result.success && result.data && result.data.products) {
            products = result.data.products
        }
    } catch (error) {
        console.error('Error fetching products:', error)
        products = []
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-4 md:mb-12">
                <div className="flex-1">
                    <h2 className="heading-1 max-w-[530px] md:mb-16 mb-6">
                        Where Texture Meets Technique
                    </h2>
                    <div className="flex items-end justify-between">
                        <p className="heading-2 max-w-[306px] md:max-w-[770px]">
                            Every rug is handwoven with care—layered with
                            texture, precision, and timeless skill
                        </p>
                        <Link
                            className="hidden md:flex btn-brand-secondary"
                            href="/rugs"
                        >
                            ALL PRODUCTS
                            <ArrowRoundedRight />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-6 px-4 md:px-6 h-full mb-8 md:mb-0">
                <div className="flex gap-4  md:gap-6 h-full">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/rugs/${product.slug}`}
                            className="block group h-full flex-shrink-0 last-of-type:pr-4"
                        >
                            <div className="h-full flex flex-col">
                                <div className="overflow-hidden">
                                    <div className="w-full h-auto flex items-center justify-center max-w-[320px] md:max-w-[540px]">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            height={756}
                                            width={540}
                                            className="object-contain w-full h-full"
                                            quality={100}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-8 max-w-[320px] md:max-w-[540px]">
                                    <h3 className="title">
                                        {(() => {
                                            const nameParts =
                                                product.title.split(' ')
                                            const firstName = nameParts[0]
                                            const secondName = nameParts
                                                .slice(1)
                                                .join(' ')

                                            return (
                                                <>
                                                    <span className="text-nomadory-primary">
                                                        {firstName}
                                                    </span>
                                                    {secondName && (
                                                        <span className="text-nomadory-primary/50">
                                                            &nbsp;{secondName}
                                                        </span>
                                                    )}
                                                </>
                                            )
                                        })()}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex md:hidden items-center">
                <Link className="btn-brand-secondary" href="rugs">
                    ALL PRODUCTS
                    <ArrowRoundedRight />
                </Link>
            </div>
        </div>
    )
}

export { ProductGallery }
