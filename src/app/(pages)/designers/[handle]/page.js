import RugsClient from '../../../sections/rugs/RugsClient'
import { getProductsByCollection } from '../../../actions/shopify'

export const revalidate = 60

const DesignerSinglePage = async ({ params }) => {
    const { handle } = await params

    let result = { success: false, data: {} }

    try {
        result = await getProductsByCollection(handle)
    } catch (error) {
        console.error('Error fetching designer products:', error)
        result = { success: false, data: {} }
    }

    const products = result.success && result.data ? result.data.products : []
    const collection =
        result.success && result.data ? result.data.collection : null

    if (!result.success || !collection) {
        return (
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 md:mb-16">
                    <h1 className="heading-1 mb-8 md:mb-0">
                        Designer Collection
                    </h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        Explore unique pieces from this designer
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">
                        Unable to load designer collection at the moment. Please
                        try again later.
                    </p>
                </div>
                <div className="h-20 md:h-40" />
            </div>
        )
    }

    return (
        <>
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 md:mb-16">
                    <h1 className="heading-1 mb-8 md:mb-0">
                        {collection.title}
                    </h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        {collection.description ||
                            'Explore unique pieces from this designer'}
                    </div>
                </div>
                {products.length > 0 ? (
                    <RugsClient rugs={products} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">
                            No products available from this designer at the
                            moment.
                        </p>
                    </div>
                )}
            </div>
            <div className="h-20 md:h-40" />
        </>
    )
}

export default DesignerSinglePage
