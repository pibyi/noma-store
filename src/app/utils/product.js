/**
 * Get designer information from a product's collections
 * Looks for collections that are part of designer collections
 * @param {Object} product - Product object with collections array
 * @param {Array} allDesigners - Optional array of all designer collections to match against
 * @returns {Object|null} Designer collection object or null if not found
 */
export function getProductDesigner(product, allDesigners = null) {
    if (!product?.collections || product.collections.length === 0) {
        return null
    }

    // If we have a list of all designers, match against it
    if (allDesigners && allDesigners.length > 0) {
        const designerHandles = new Set(
            allDesigners.map((designer) => designer.handle)
        )
        const designerCollection = product.collections.find((collection) =>
            designerHandles.has(collection.handle)
        )
        return designerCollection || null
    }

    // Otherwise, try to identify designer collections by naming convention
    // Assuming designer collections might have specific patterns in their handle or title
    // You can customize this logic based on your Shopify setup
    const designerCollection = product.collections.find(
        (collection) =>
            // Exclude common collection types
            collection.handle !== 'rugs' &&
            collection.handle !== 'featured' &&
            collection.handle !== 'home-page-designers-collection' &&
            // You can add more logic here to identify designer collections
            !collection.handle.includes('sale') &&
            !collection.handle.includes('new')
    )

    return designerCollection || null
}
