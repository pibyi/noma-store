'use client'

import { useCart } from '@/app/components/cart/CartProvider'
import { formatPrice } from '@/app/lib/formatters'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
    const {
        lines,
        isEmpty,
        isLoading,
        subtotal,
        currencyCode,
        checkoutUrl,
        updateLineItem,
        removeLineItem,
        itemCount,
    } = useCart()

    const handleCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl
        }
    }

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-nomadory-background py-8">
                <div className="nomadory-container max-w-7xl">
                    <h1 className="title mb-8 text-nomadory-primary">
                        Shopping Cart
                    </h1>
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-32 h-32 mx-auto mb-6 text-nomadory-primary/20">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-medium mb-4 text-nomadory-primary font-cormorant-garamond">
                            Your cart is empty
                        </h2>
                        <p className="text-nomadory-primary/60 mb-8 font-poppins">
                            Discover our collection of beautiful handcrafted
                            rugs
                        </p>
                        <Link href="/shop" className="btn-brand-primary">
                            SHOP RUGS
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-nomadory-background py-8">
            <div className="nomadory-container max-w-7xl">
                <h1 className="title mb-8 text-nomadory-primary">
                    Shopping Cart ({itemCount}{' '}
                    {itemCount === 1 ? 'item' : 'items'})
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {lines.map((line) => (
                            <CartItem
                                key={line.id}
                                line={line}
                                onUpdateQuantity={updateLineItem}
                                onRemove={removeLineItem}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-nomadory-primary/10 p-6 sticky top-4">
                            <h2 className="text-xl font-medium mb-6 text-nomadory-primary font-poppins">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-nomadory-primary/60 font-poppins">
                                    <span>Subtotal</span>
                                    <span className="text-nomadory-primary font-medium">
                                        {formatPrice(subtotal, currencyCode)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-nomadory-primary/60 font-poppins text-sm">
                                    <span>Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-nomadory-primary/60 font-poppins text-sm">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t border-nomadory-primary/10 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-medium text-nomadory-primary font-poppins">
                                    <span>Total</span>
                                    <span>
                                        {formatPrice(subtotal, currencyCode)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={!checkoutUrl || isLoading}
                                className="btn-brand-primary w-full disabled:opacity-50 mb-4"
                            >
                                PROCEED TO CHECKOUT
                            </button>

                            <Link
                                href="/shop"
                                className="block w-full py-3 border border-nomadory-secondary text-nomadory-secondary hover:bg-nomadory-secondary hover:text-white transition-all duration-700 font-medium rounded-full text-center"
                            >
                                CONTINUE SHOPPING
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CartItem({ line, onUpdateQuantity, onRemove, isLoading }) {
    const { merchandise, quantity, cost } = line
    const product = merchandise.product
    const image = product.featuredImage

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) return
        onUpdateQuantity(line.id, newQuantity)
    }

    const handleRemove = () => {
        onRemove(line.id)
    }

    return (
        <div className="flex gap-6 pb-6 border-b border-nomadory-primary/10">
            {/* Image */}
            <Link
                href={`/shop/${product.handle}`}
                className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 bg-nomadory-primary/5 hover:opacity-75 transition-opacity"
            >
                {image && (
                    <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover"
                    />
                )}
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/shop/${product.handle}`}
                    className="hover:underline"
                >
                    <h3 className="font-medium text-lg mb-1 text-nomadory-primary font-poppins">
                        {product.title}
                    </h3>
                </Link>

                {merchandise.title !== 'Default Title' && (
                    <p className="text-nomadory-primary/60 mb-2 font-poppins">
                        {merchandise.title}
                    </p>
                )}

                <p className="text-lg font-medium mb-4 text-nomadory-primary font-poppins">
                    {formatPrice(
                        merchandise.price.amount,
                        merchandise.price.currencyCode
                    )}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-nomadory-primary/20">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={isLoading || quantity <= 1}
                            className="px-4 py-2 hover:bg-nomadory-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-nomadory-primary"
                        >
                            −
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center text-nomadory-primary">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={isLoading}
                            className="px-4 py-2 hover:bg-nomadory-primary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-nomadory-primary"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={handleRemove}
                        disabled={isLoading}
                        className="text-nomadory-primary/60 hover:text-nomadory-primary underline disabled:opacity-50 font-poppins"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {/* Line Total */}
            <div className="text-right">
                <p className="font-medium text-lg text-nomadory-primary font-poppins">
                    {formatPrice(
                        cost.totalAmount.amount,
                        cost.totalAmount.currencyCode
                    )}
                </p>
            </div>
        </div>
    )
}
