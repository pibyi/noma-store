import { notFound } from 'next/navigation'
import { RugsImage, RugDetails, RelatedRugs } from '../../../sections'
import { getProducts } from '../../../actions/shopify'

// Revalidate this page every 60 seconds
export const revalidate = 60

const RugSinglePage = async ({ params }) => {
    const { slug } = await params

    try {
        const results = await getProducts()
        if (!results.success || !results.data || !results.data.products) {
            notFound()
        }

        const product = results.data.products.find((node) => node.slug === slug)
        const products = results.data.products
        const relatedRugs =
            product?.relatedProducts?.length > 0
                ? product?.relatedProducts
                : products?.filter((node) => {
                      if (node.id === product.id) {
                          return false
                      }
                      const nodeConstruction = node?.details?.Construction
                          ? node.details.Construction.split(',')
                                .map((c) => c.trim())
                                .filter((c) => c)
                          : []
                      const currentProductConstruction = product?.details
                          ?.Construction
                          ? product.details.Construction.split(',')
                                .map((c) => c.trim())
                                .filter((c) => c)
                          : []

                      return nodeConstruction.some((construction) =>
                          currentProductConstruction.includes(construction)
                      )
                  }) || []

        if (!product) {
            notFound()
        }

        return (
            <div>
                <div className="nomadory-container">
                    <div className="flex md:flex-row flex-col justify-between">
                        <div className="w-full md:w-[49.2%] mb-4 md:mb-0">
                            <RugsImage product={product} />
                        </div>
                        <div
                            id="single-rugs-page-container"
                            className="flex gap-20 md:gap-12 flex-col w-full md:w-[41.6%] md:sticky top-0 self-start overflow-y-auto"
                        >
                            <RugDetails products={products} product={product} />
                            {relatedRugs?.length > 0 && (
                                <RelatedRugs relatedProducts={relatedRugs} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-20 md:h-40" />
            </div>
        )
    } catch (error) {
        console.error('Error fetching products:', error)
        notFound()
    }
}
export default RugSinglePage
