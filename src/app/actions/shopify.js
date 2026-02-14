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

            const variant = edge.node.variants?.edges?.[0]?.node

            product.images = images
            product.thumbnail = images[0] || null
            product.slug = edge.node.handle
            product.sku = variant?.sku || null
            product.variantId = variant?.id || null
            product.price = variant?.price?.amount || null
            product.currencyCode = variant?.price?.currencyCode || 'USD'
            product.availableForSale = variant?.availableForSale || false

            product.details = {
                Construction: edge.node.technique?.value,
                Material: edge.node.material?.value,
                Backing: edge.node.backing?.value,
                'Use Cases / Application': edge.node.useCases?.value,
                Traffic: edge.node.traffic?.value,
                'Sustainability Tag': edge.node.sustainabilityTag?.value,
            }
            product.designer = {
                title: edge.node.designedBy?.reference?.title,
                descriptionHtml:
                    edge.node.designedBy?.reference?.descriptionHtml,
                avatar: edge.node.designedBy?.reference?.designerAvatar
                    ?.reference?.image,
                handle: edge.node.designedBy?.reference?.handle,
                projects:
                    edge.node.designedBy?.reference?.designerWorks?.references.edges.map(
                        (edge) => {
                            return edge.node?.image
                        }
                    ),
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

            const variant = edge.node.variants?.edges?.[0]?.node

            product.images = images
            product.thumbnail = images[0] || null
            product.slug = edge.node.handle
            product.sku = variant?.sku || null
            product.variantId = variant?.id || null
            product.price = variant?.price?.amount || null
            product.currencyCode = variant?.price?.currencyCode || 'USD'
            product.availableForSale = variant?.availableForSale || false

            product.details = {
                Construction: edge.node.technique?.value,
                Material: edge.node.material?.value,
                Backing: edge.node.backing?.value,
                'Use Cases / Application': edge.node.useCases?.value,
                Traffic: edge.node.traffic?.value,
                'Sustainability Tag': edge.node.sustainabilityTag?.value,
            }

            if (edge.node.designedBy?.reference) {
                product.designer = edge.node.designedBy.reference
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
                                price {
                                    amount
                                    currencyCode
                                }
                                availableForSale
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
                    isPurchasable: metafield(namespace: "custom", key: "is_purchasable") {
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
                    designedBy: metafield(namespace: "custom", key: "designed_by") {
                        reference {
                            ... on Collection {
                                id
                                title
                                handle
                                descriptionHtml
                                image {
                                    altText
                                    id
                                    url
                                }
                                designerWorks: metafield(namespace: "custom", key: "designer_works") {
                                    references(first: 10) {
                                        edges {
                                            node {
                                                ... on MediaImage {
                                                    image {
                                                        url
                                                        altText
                                                        width
                                                        height
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                designerAvatar: metafield(namespace: "custom", key: "designer_avatar") {
                                    reference {
                                        ... on MediaImage {
                                            image {
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
                        designedBy: metafield(namespace: "custom", key: "designed_by") {
                            reference {
                                ... on Collection {
                                    id
                                    title
                                    handle
                                    descriptionHtml
                                    image {
                                        altText
                                        id
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

async function createCart() {
    try {
        const response = await client.request(CREATE_CART_MUTATION, {
            variables: {
                input: {},
            },
        })

        if (response.errors) {
            console.log('[CREATE_CART_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message || 'Failed to create cart',
                    code: 400,
                },
            }
        }

        return {
            success: true,
            data: {
                cart: response.data.cartCreate.cart,
            },
        }
    } catch (error) {
        console.log('[CREATE_CART_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message || 'Failed to create cart',
                code: 500,
            },
        }
    }
}

/**
 * Add items to cart
 * @param {string} cartId - The cart ID
 * @param {Array<{merchandiseId: string, quantity: number}>} lines - Items to add
 * @returns {Promise<{success: boolean, data?: {cart: object}, error?: object}>}
 */
async function addToCart(cartId, lines) {
    try {
        const response = await client.request(ADD_TO_CART_MUTATION, {
            variables: {
                cartId,
                lines,
            },
        })

        if (response.errors) {
            console.log('[ADD_TO_CART_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message ||
                        'Failed to add items to cart',
                    code: 400,
                },
            }
        }

        if (response.data.cartLinesAdd.userErrors?.length > 0) {
            return {
                success: false,
                error: {
                    message: response.data.cartLinesAdd.userErrors[0].message,
                    code: 400,
                },
            }
        }

        return {
            success: true,
            data: {
                cart: response.data.cartLinesAdd.cart,
            },
        }
    } catch (error) {
        console.log('[ADD_TO_CART_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message || 'Failed to add items to cart',
                code: 500,
            },
        }
    }
}

/**
 * Update cart line quantities
 * @param {string} cartId - The cart ID
 * @param {Array<{id: string, quantity: number}>} lines - Lines to update
 * @returns {Promise<{success: boolean, data?: {cart: object}, error?: object}>}
 */
async function updateCartLines(cartId, lines) {
    try {
        const response = await client.request(UPDATE_CART_LINES_MUTATION, {
            variables: {
                cartId,
                lines,
            },
        })

        if (response.errors) {
            console.log('[UPDATE_CART_LINES_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message ||
                        'Failed to update cart items',
                    code: 400,
                },
            }
        }

        if (response.data.cartLinesUpdate.userErrors?.length > 0) {
            return {
                success: false,
                error: {
                    message:
                        response.data.cartLinesUpdate.userErrors[0].message,
                    code: 400,
                },
            }
        }

        return {
            success: true,
            data: {
                cart: response.data.cartLinesUpdate.cart,
            },
        }
    } catch (error) {
        console.log('[UPDATE_CART_LINES_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message || 'Failed to update cart items',
                code: 500,
            },
        }
    }
}

/**
 * Remove items from cart
 * @param {string} cartId - The cart ID
 * @param {Array<string>} lineIds - Line IDs to remove
 * @returns {Promise<{success: boolean, data?: {cart: object}, error?: object}>}
 */
async function removeFromCart(cartId, lineIds) {
    try {
        const response = await client.request(REMOVE_FROM_CART_MUTATION, {
            variables: {
                cartId,
                lineIds,
            },
        })

        if (response.errors) {
            console.log('[REMOVE_FROM_CART_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message ||
                        'Failed to remove items from cart',
                    code: 400,
                },
            }
        }

        if (response.data.cartLinesRemove.userErrors?.length > 0) {
            return {
                success: false,
                error: {
                    message:
                        response.data.cartLinesRemove.userErrors[0].message,
                    code: 400,
                },
            }
        }

        return {
            success: true,
            data: {
                cart: response.data.cartLinesRemove.cart,
            },
        }
    } catch (error) {
        console.log('[REMOVE_FROM_CART_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message || 'Failed to remove items from cart',
                code: 500,
            },
        }
    }
}

/**
 * Get cart details
 * @param {string} cartId - The cart ID
 * @returns {Promise<{success: boolean, data?: {cart: object}, error?: object}>}
 */
async function getCart(cartId) {
    try {
        const response = await client.request(GET_CART_QUERY, {
            variables: {
                cartId,
            },
        })

        if (response.errors) {
            console.log('[GET_CART_ERROR]', response.errors)
            return {
                success: false,
                error: {
                    message:
                        response.errors[0]?.message || 'Failed to fetch cart',
                    code: 400,
                },
            }
        }

        if (!response.data.cart) {
            return {
                success: false,
                error: {
                    message: 'Cart not found',
                    code: 404,
                },
            }
        }

        return {
            success: true,
            data: {
                cart: response.data.cart,
            },
        }
    } catch (error) {
        console.log('[GET_CART_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message || 'Failed to fetch cart',
                code: 500,
            },
        }
    }
}

// ============================================
// CART GRAPHQL QUERIES & MUTATIONS
// ============================================

const CART_FRAGMENT = `
    fragment CartFragment on Cart {
        id
        checkoutUrl
        totalQuantity
        cost {
            subtotalAmount {
                amount
                currencyCode
            }
            totalAmount {
                amount
                currencyCode
            }
        }
        lines(first: 100) {
            edges {
                node {
                    id
                    quantity
                    cost {
                        totalAmount {
                            amount
                            currencyCode
                        }
                    }
                    merchandise {
                        ... on ProductVariant {
                            id
                            title
                            price {
                                amount
                                currencyCode
                            }
                            product {
                                id
                                title
                                handle
                                featuredImage {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const CREATE_CART_MUTATION = `
    ${CART_FRAGMENT}
    mutation createCart($input: CartInput!) {
        cartCreate(input: $input) {
            cart {
                ...CartFragment
            }
            userErrors {
                field
                message
            }
        }
    }
`

const ADD_TO_CART_MUTATION = `
    ${CART_FRAGMENT}
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
                ...CartFragment
            }
            userErrors {
                field
                message
            }
        }
    }
`

const UPDATE_CART_LINES_MUTATION = `
    ${CART_FRAGMENT}
    mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
                ...CartFragment
            }
            userErrors {
                field
                message
            }
        }
    }
`

const REMOVE_FROM_CART_MUTATION = `
    ${CART_FRAGMENT}
    mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
                ...CartFragment
            }
            userErrors {
                field
                message
            }
        }
    }
`

const GET_CART_QUERY = `
    ${CART_FRAGMENT}
    query getCart($cartId: ID!) {
        cart(id: $cartId) {
            ...CartFragment
        }
    }
`

export {
    getProducts,
    getProductsByCollection,
    createCart,
    addToCart,
    updateCartLines,
    removeFromCart,
    getCart,
}
