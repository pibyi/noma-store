// Cart-related constants

export const CART_STORAGE_KEY = 'nomadory_cart_id'

export const CART_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    ERROR: 'error',
    SUCCESS: 'success',
}

export const CART_ERRORS = {
    CREATE_FAILED: 'Failed to create cart. Please try again.',
    ADD_FAILED: 'Failed to add item to cart. Please try again.',
    UPDATE_FAILED: 'Failed to update cart. Please try again.',
    REMOVE_FAILED: 'Failed to remove item from cart. Please try again.',
    FETCH_FAILED: 'Failed to load cart. Please try again.',
    CHECKOUT_FAILED: 'Failed to proceed to checkout. Please try again.',
}

export const CART_MESSAGES = {
    ITEM_ADDED: 'Item added to cart',
    ITEM_REMOVED: 'Item removed from cart',
    CART_UPDATED: 'Cart updated',
    CART_CLEARED: 'Cart cleared',
}
