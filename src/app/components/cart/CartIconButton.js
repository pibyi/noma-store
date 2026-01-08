'use client'

import { useCart } from './CartProvider'
import CartIcon from '@/app/icons/CartIcon'

export default function CartIconButton() {
    const { itemCount, toggleDrawer } = useCart()

    return (
        <button
            onClick={toggleDrawer}
            className="relative p-2 hover:opacity-70 cursor-pointer transition-opacity text-nomadory-primary"
            aria-label="Shopping cart"
        >
            <CartIcon className="w-7 h-7" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nomadory-secondary text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center font-poppins">
                    {itemCount > 9 ? '9+' : itemCount}
                </span>
            )}
        </button>
    )
}
