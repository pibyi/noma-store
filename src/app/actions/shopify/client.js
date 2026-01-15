import { createStorefrontApiClient } from '@shopify/storefront-api-client'
const shopifyClient = createStorefrontApiClient({
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

export { shopifyClient }
