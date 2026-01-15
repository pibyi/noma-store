import DesignersClient from '../../sections/designers/DesignersClient'
import { getCollectionWithSubCollectionBySlug } from '../../actions/shopify/collections'

export const revalidate = 60

const DesignersPage = async () => {
    let result = { success: false, data: {} }

    try {
        result = await getCollectionWithSubCollectionBySlug(
            'home-page-designers-collection'
        )
    } catch (error) {
        console.error('Error fetching designers:', error)
        result = { success: false, data: {} }
    }

    const designers =
        result.success && result.data ? result.data.subCollections : []

    if (!result.success) {
        return (
            <div className="nomadory-container">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-6 md:mb-16">
                    <h1 className="heading-1 mb-8 md:mb-0">
                        Explore Designers
                    </h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        Discover the artisans and creators behind each
                        masterpiece
                    </div>
                </div>
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">
                        Unable to load designers at the moment. Please try again
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
                    <h1 className="heading-1 mb-8 md:mb-0">
                        Explore Designers
                    </h1>
                    <div className="max-w-[358px] md:max-w-[475px] heading-2">
                        Discover the artisans and creators behind each
                        masterpiece
                    </div>
                </div>
                {designers.length > 0 ? (
                    <DesignersClient designers={designers} />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">
                            No designers available at the moment.
                        </p>
                    </div>
                )}
            </div>
            <div className="h-20 md:h-40" />
        </>
    )
}

export default DesignersPage
