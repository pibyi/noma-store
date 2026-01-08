'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react'
import {
    createCart,
    addToCart as addToCartAction,
    updateCartLines as updateCartLinesAction,
    removeFromCart as removeFromCartAction,
    getCart as getCartAction,
} from '@/app/actions/shopify'
import {
    CART_STORAGE_KEY,
    CART_STATES,
    CART_ERRORS,
} from '@/app/constants/cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
    const [cart, setCart] = useState(null)
    const [cartId, setCartId] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [state, setState] = useState(CART_STATES.IDLE)
    const [error, setError] = useState(null)

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCartId = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCartId) {
            setCartId(storedCartId)
            loadCart(storedCartId)
        }
    }, [])

    // Save cart ID to localStorage when it changes
    useEffect(() => {
        if (cartId) {
            localStorage.setItem(CART_STORAGE_KEY, cartId)
        }
    }, [cartId])

    /**
     * Load cart from Shopify
     */
    const loadCart = useCallback(async (id) => {
        setState(CART_STATES.LOADING)
        setError(null)

        const result = await getCartAction(id)

        if (result.success) {
            setCart(result.data.cart)
            setState(CART_STATES.SUCCESS)
        } else {
            // Cart might be expired or invalid
            console.error('Failed to load cart:', result.error)
            localStorage.removeItem(CART_STORAGE_KEY)
            setCartId(null)
            setCart(null)
            setState(CART_STATES.IDLE)
        }
    }, [])

    /**
     * Initialize a new cart if needed
     */
    const initializeCart = useCallback(async () => {
        if (cartId) return cartId

        setState(CART_STATES.LOADING)
        setError(null)

        const result = await createCart()

        if (result.success) {
            const newCartId = result.data.cart.id
            setCartId(newCartId)
            setCart(result.data.cart)
            setState(CART_STATES.SUCCESS)
            return newCartId
        } else {
            setError(CART_ERRORS.CREATE_FAILED)
            setState(CART_STATES.ERROR)
            return null
        }
    }, [cartId])

    /**
     * Add item to cart
     */
    const addToCart = useCallback(
        async (merchandiseId, quantity = 1) => {
            setState(CART_STATES.LOADING)
            setError(null)

            // Ensure we have a cart
            const currentCartId = cartId || (await initializeCart())
            if (!currentCartId) {
                setError(CART_ERRORS.ADD_FAILED)
                setState(CART_STATES.ERROR)
                return { success: false }
            }

            const result = await addToCartAction(currentCartId, [
                { merchandiseId, quantity },
            ])

            if (result.success) {
                setCart(result.data.cart)
                setState(CART_STATES.SUCCESS)
                setIsDrawerOpen(true) // Open drawer on successful add
                return { success: true }
            } else {
                setError(result.error?.message || CART_ERRORS.ADD_FAILED)
                setState(CART_STATES.ERROR)
                return { success: false, error: result.error }
            }
        },
        [cartId, initializeCart]
    )

    /**
     * Update line item quantity
     */
    const updateLineItem = useCallback(
        async (lineId, quantity) => {
            if (!cartId) return { success: false }

            setState(CART_STATES.LOADING)
            setError(null)

            const result = await updateCartLinesAction(cartId, [
                { id: lineId, quantity },
            ])

            if (result.success) {
                setCart(result.data.cart)
                setState(CART_STATES.SUCCESS)
                return { success: true }
            } else {
                setError(result.error?.message || CART_ERRORS.UPDATE_FAILED)
                setState(CART_STATES.ERROR)
                return { success: false, error: result.error }
            }
        },
        [cartId]
    )

    /**
     * Remove line item from cart
     */
    const removeLineItem = useCallback(
        async (lineId) => {
            if (!cartId) return { success: false }

            setState(CART_STATES.LOADING)
            setError(null)

            const result = await removeFromCartAction(cartId, [lineId])

            if (result.success) {
                setCart(result.data.cart)
                setState(CART_STATES.SUCCESS)
                return { success: true }
            } else {
                setError(result.error?.message || CART_ERRORS.REMOVE_FAILED)
                setState(CART_STATES.ERROR)
                return { success: false, error: result.error }
            }
        },
        [cartId]
    )

    /**
     * Open cart drawer
     */
    const openDrawer = useCallback(() => {
        setIsDrawerOpen(true)
    }, [])

    /**
     * Close cart drawer
     */
    const closeDrawer = useCallback(() => {
        setIsDrawerOpen(false)
    }, [])

    /**
     * Toggle cart drawer
     */
    const toggleDrawer = useCallback(() => {
        setIsDrawerOpen((prev) => !prev)
    }, [])

    // Computed values
    const itemCount = cart?.totalQuantity || 0
    const subtotal = cart?.cost?.subtotalAmount?.amount || '0'
    const total = cart?.cost?.totalAmount?.amount || '0'
    const currencyCode = cart?.cost?.totalAmount?.currencyCode || 'USD'
    const checkoutUrl = cart?.checkoutUrl || null
    const lines = cart?.lines?.edges?.map((edge) => edge.node) || []
    const isEmpty = itemCount === 0
    const isLoading = state === CART_STATES.LOADING

    const value = {
        // State
        cart,
        cartId,
        lines,
        itemCount,
        subtotal,
        total,
        currencyCode,
        checkoutUrl,
        isEmpty,
        isLoading,
        error,
        state,

        // Drawer
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        toggleDrawer,

        // Actions
        addToCart,
        updateLineItem,
        removeLineItem,
        loadCart,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
