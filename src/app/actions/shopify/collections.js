'use server'
import { shopifyClient } from './client'

const getCollectionWithSubCollectionBySlug = async (slug) => {
    const GET_COLLECTION_WITH_SUBCOLLECTION_BY_SLUG_QUERY = `
        query getCollectionWithSubCollectionBySlug($handle: String!) {
            collection(handle: $handle) {
                id
                title
                description
                image {
                    url
                }
                subCollections: metafield(namespace: "custom", key: "sub_collections") {
                    references(first: 100) {
                        edges {
                            node {
                                ... on Collection {
                                    id
                                    title
                                    handle
                                    description
                                    image {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `

    try {
        const response = await shopifyClient.request(
            GET_COLLECTION_WITH_SUBCOLLECTION_BY_SLUG_QUERY,
            {
                variables: {
                    handle: slug,
                },
            }
        )

        if (response.errors) {
            console.log(
                '[GET_COLLECTION_WITH_SUBCOLLECTION_BY_SLUG_ERROR]',
                response.errors
            )
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
        const subCollections =
            collection.subCollections?.references?.edges?.map(
                (edge) => edge.node
            ) || []

        return {
            success: true,
            data: {
                collection,
                subCollections,
            },
        }
    } catch (error) {
        console.log('[GET_COLLECTION_WITH_SUBCOLLECTION_BY_SLUG_ERROR]', error)
        return {
            success: false,
            error: {
                message: error.message,
                code: error.response?.status || 500,
            },
        }
    }
}

export { getCollectionWithSubCollectionBySlug }
