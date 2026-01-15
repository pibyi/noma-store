import { ArrowRoundedRight } from '../../icons'
import Link from 'next/link'
import Image from 'next/image'
import { getCollectionWithSubCollectionBySlug } from '../../actions/shopify/collections'

const ShopByDesigners = async () => {
    let designers = []

    try {
        const result = await getCollectionWithSubCollectionBySlug(
            'home-page-designers-collection'
        )

        if (result.success && result.data && result.data.subCollections) {
            designers = result.data.subCollections
        }
    } catch (error) {
        console.error('Error fetching designers:', error)
        designers = []
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-4 md:mb-12">
                <div className="flex-1">
                    <h2 className="heading-1 max-w-[530px] md:mb-16 mb-6">
                        Shop by Designers
                    </h2>
                    <div className="flex items-end justify-between">
                        <p className="tracking-wider heading-2 max-w-[306px] md:max-w-[770px]">
                            Discover unique collections from our talented
                            designers
                        </p>
                        <Link
                            className="hidden md:flex btn-brand-secondary"
                            href="/designers"
                        >
                            ALL DESIGNERS
                            <ArrowRoundedRight />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-6 px-4 md:px-6 h-full mb-8 md:mb-0">
                <div className="flex gap-4  md:gap-6 h-full">
                    {designers.map((designer) => (
                        <Link
                            key={designer.id}
                            href={`/designers/${designer.handle}`}
                            className="block group h-full flex-shrink-0 last-of-type:pr-4"
                        >
                            <div className="h-full flex flex-col">
                                <div className="overflow-hidden">
                                    <div className="w-full h-auto flex items-center justify-center max-w-[320px] md:max-w-[540px]">
                                        {designer.image?.url && (
                                            <Image
                                                src={designer.image.url}
                                                alt={
                                                    designer.image.altText ||
                                                    designer.title
                                                }
                                                height={360}
                                                width={270}
                                                className="object-contain w-full h-full"
                                                quality={100}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-8 max-w-[320px] md:max-w-[540px]">
                                    <h3 className="title">
                                        {(() => {
                                            const nameParts =
                                                designer.title.split(' ')
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
                                    {designer.description && (
                                        <p className="text-sm mt-2 text-nomadory-primary/70">
                                            {designer.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex md:hidden items-center">
                <Link className="btn-brand-secondary" href="/designers">
                    ALL DESIGNERS
                    <ArrowRoundedRight />
                </Link>
            </div>
        </div>
    )
}

export { ShopByDesigners }
