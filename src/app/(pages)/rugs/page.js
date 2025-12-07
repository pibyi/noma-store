import RugsClient from '../../sections/rugs/RugsClient'
import { getProductsByCollection } from '../../actions/shopify'

export const revalidate = 60

const RugsPage = async () => {
    let result = { success: false, data: [] }

    try {
        result = await getProductsByCollection('rugs')
    } catch (error) {
        console.error('Error fetching products:', error)
        result = { success: false, data: [] }
    }

    const rugs = result.success && result.data ? result.data.products : []
    if (!result.success) {
        return (
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 md:mb-16">
                    <h1 className="heading-1 mb-8 md:mb-0">Explore Rugs</h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        Discover the textures, stories, and spirit behind each
                        weave
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">
                        Unable to load rugs at the moment. Please try again
                        later.
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
                    <h1 className="heading-1 mb-8 md:mb-0">Explore Rugs</h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        Discover the textures, stories, and spirit behind each
                        weave
                    </div>
                </div>
                {rugs.length > 0 ? (
                    <RugsClient rugs={rugs} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">
                            No rugs available at the moment.
                        </p>
                    </div>
                )}
            </div>
            <div className="h-20 md:h-40" />
        </>
    )
}

export default RugsPage
