'use server'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
const client = createStorefrontApiClient({
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    apiVersion: '2025-10',
    publicAccessToken: process.env.STOREFRONT_PUBLIC_ACCESS_TOKEN,
    customFetchApi: (url, init) => {
        return fetch(url, {
            ...init,
            cache: 'no-store',
            next: { revalidate: 0 },
        })
    },
})

function parseRichText(richTextValue) {
    if (!richTextValue) return []

    try {
        const parsed =
            typeof richTextValue === 'string'
                ? JSON.parse(richTextValue)
                : richTextValue

        const textItems = []

        function traverse(node) {
            if (!node) return

            if (node.type === 'text' && node.value) {
                textItems.push(node.value)
            }

            if (node.type === 'list-item' && node.children) {
                const listItemText = []
                node.children.forEach((child) => {
                    if (child.type === 'text' && child.value) {
                        listItemText.push(child.value)
                    } else if (child.children) {
                        child.children.forEach((c) => {
                            if (c.type === 'text' && c.value) {
                                listItemText.push(c.value)
                            }
                        })
                    }
                })
                if (listItemText.length > 0) {
                    textItems.push(listItemText.join(' '))
                }
            } else if (node.children) {
                node.children.forEach((child) => traverse(child))
            }
        }

        traverse(parsed)
        return textItems
    } catch (error) {
        return typeof richTextValue === 'string'
            ? richTextValue.split('\n').filter(Boolean)
            : []
    }
}

async function getProducts(first = 100) {
    try {
        const response = await client.request(GET_PRODUCTS_QUERY, {
            variables: {
                first: first,
            },
        })

        if (response.errors) {
            console.log('[GET_PRODUCTS_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message || 'Something went wrong!',
                    code: 400,
                },
            }
        }

        const products = response.data.products.edges.map((edge) => {
            const product = edge.node
            const images = edge.node.images
                ? edge.node.images.edges.map((edge) => edge.node.url)
                : []

            product.images = images
            product.thumbnail = images[0] || null
            product.slug = edge.node.handle
            product.sku = edge.node.variants?.edges?.[0]?.node?.sku || null

            product.details = {
                Construction: edge.node.technique?.value,
                Material: edge.node.material?.value,
                Backing: edge.node.backing?.value,
                'Use Cases / Application': edge.node.useCases?.value,
                Traffic: edge.node.traffic?.value,
                'Sustainability Tag': edge.node.sustainabilityTag?.value,
            }

            if (edge.node.relatedProducts) {
                if (edge.node.relatedProducts.references) {
                    product.relatedProducts =
                        edge.node.relatedProducts.references.edges.map(
                            (edge) => {
                                const relatedImages =
                                    edge.node.images.edges.map(
                                        (edge) => edge.node.url
                                    )
                                return {
                                    ...edge.node,
                                    images: relatedImages,
                                    thumbnail: relatedImages[0] || null,
                                    slug: edge.node.handle,
                                }
                            }
                        )
                }
            }
            return product
        })

        return {
            success: true,
            data: {
                products,
            },
        }
    } catch (error) {
        console.log('[GET_PRODUCTS_ERROR]', response.errors)

        if (error.graphQLErrors) {
            return {
                success: false,
                error: {
                    message:
                        error.graphQLErrors[0]?.message ||
                        'GraphQL error occurred',
                    code: 400,
                },
            }
        }

        return {
            success: false,
            error: {
                message: error.message,
                code: error.response?.status || 500,
            },
        }
    }
}
async function getProductsByCollection(collectionHandle, first = 100) {
    try {
        const response = await client.request(
            GET_PRODUCTS_BY_COLLECTION_QUERY,
            {
                variables: {
                    handle: collectionHandle,
                    first: first,
                },
            }
        )

        if (response.errors) {
            console.log('[GET_PRODUCTS_BY_COLLECTION_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message || 'Something went wrong!',
                    code: 400,
                },
            }
        }

        if (!response.data.collection) {
            return {
                success: false,
                error: {
                    message: 'Collection not found',
                    code: 404,
                },
            }
        }

        const collection = response.data.collection
        const products = collection.products.edges.map((edge) => {
            const product = edge.node
            const images = edge.node.images
                ? edge.node.images.edges.map((edge) => edge.node.url)
                : []

            product.images = images
            product.thumbnail = images[0] || null
            product.slug = edge.node.handle
            product.sku = edge.node.variants?.edges?.[0]?.node?.sku || null

            product.details = {
                Construction: edge.node.technique?.value,
                Material: edge.node.material?.value,
                Backing: edge.node.backing?.value,
                'Use Cases / Application': edge.node.useCases?.value,
                Traffic: edge.node.traffic?.value,
                'Sustainability Tag': edge.node.sustainabilityTag?.value,
            }

            if (edge.node.relatedProducts) {
                if (edge.node.relatedProducts.references) {
                    product.relatedProducts =
                        edge.node.relatedProducts.references.edges.map(
                            (edge) => {
                                const relatedImages =
                                    edge.node.images.edges.map(
                                        (edge) => edge.node.url
                                    )
                                return {
                                    ...edge.node,
                                    images: relatedImages,
                                    thumbnail: relatedImages[0] || null,
                                    slug: edge.node.handle,
                                }
                            }
                        )
                }
            }
            return product
        })

        return {
            success: true,
            data: {
                collection: {
                    id: collection.id,
                    title: collection.title,
                    handle: collection.handle,
                    description: collection.description,
                },
                products,
            },
        }
    } catch (error) {
        console.log('[GET_PRODUCTS_BY_COLLECTION_ERROR]', error)

        if (error.graphQLErrors) {
            return {
                success: false,
                error: {
                    message:
                        error.graphQLErrors[0]?.message ||
                        'GraphQL error occurred',
                    code: 400,
                },
            }
        }

        return {
            success: false,
            error: {
                message: error.message,
                code: error.response?.status || 500,
            },
        }
    }
}

const GET_PRODUCTS_QUERY = `
    query getProducts($first: Int!) {
        products(first: $first) {
            edges {
                node {
                    id
                    title
                    handle
                    description
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                sku
                            }
                        }
                    }
                    images(first: 3) {
                        edges {
                            node {
                                id
                                url
                                altText
                                width
                                height
                            }
                        }
                    }
                    relatedProducts: metafield(namespace: "custom", key: "related_products") {
                        id
                        namespace
                        key
                        type
                        value
                        description
                        references(first: 10) {
                            edges {
                                node {
                                    ... on Product {
                                        id
                                        title
                                        handle
                                        description
                                        images(first: 1) {
                                            edges {
                                                node {
                                                    url
                                                    altText
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    traffic: metafield(namespace: "custom", key: "traffic") {
                        value
                    }
                    useCases: metafield(namespace: "custom", key: "use_cases_application") {
                        value
                    }
                    technique: metafield(namespace: "custom", key: "technique") {
                        value
                    }
                    sustainabilityTag: metafield(namespace: "custom", key: "sustainability_tag") {
                        value
                    }
                    material: metafield(namespace: "custom", key: "material") {
                        value
                    }
                    backing: metafield(namespace: "custom", key: "backing") {
                        value
                    }
                }
            }
        }
    }
`

const GET_PRODUCTS_BY_COLLECTION_QUERY = `
    query getProductsByCollection($handle: String!, $first: Int!) {
        collection(handle: $handle) {
            id
            title
            handle
            description
            products(first: $first) {
                edges {
                    node {
                        id
                        title
                        handle
                        description
                        images(first: 3) {
                            edges {
                                node {
                                    id
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                        relatedProducts: metafield(namespace: "custom", key: "related_products") {
                            id
                            namespace
                            key
                            type
                            value
                            description
                            references(first: 10) {
                                edges {
                                    node {
                                        ... on Product {
                                            id
                                            title
                                            handle
                                            description
                                            images(first: 1) {
                                                edges {
                                                    node {
                                                        url
                                                        altText
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        traffic: metafield(namespace: "custom", key: "traffic") {
                            value
                        }
                        useCases: metafield(namespace: "custom", key: "use_cases_application") {
                            value
                        }
                        technique: metafield(namespace: "custom", key: "technique") {
                            value
                        }
                        sustainabilityTag: metafield(namespace: "custom", key: "sustainability_tag") {
                            value
                        }
                        material: metafield(namespace: "custom", key: "material") {
                            value
                        }
                        backing: metafield(namespace: "custom", key: "backing") {
                            value
                        }
                    }
                }
            }
        }
    }
`

export { getProducts, getProductsByCollection }
