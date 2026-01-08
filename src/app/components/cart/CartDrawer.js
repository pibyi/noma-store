'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartProvider'
import { formatPrice } from '@/app/lib/formatters'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from '@/app/icons'

export default function CartDrawer() {
    const {
        isDrawerOpen,
        closeDrawer,
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

    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isDrawerOpen])

    const handleCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl
        }
    }

    return (
        <AnimatePresence>
            {isDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDrawer}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 300,
                        }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-nomadory-background shadow-2xl z-50 flex flex-col font-poppins"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-nomadory-primary/10">
                            <h2 className="text-xl font-medium text-nomadory-primary">
                                Shopping Cart{' '}
                                {itemCount > 0 && `(${itemCount})`}
                            </h2>
                            <button
                                onClick={closeDrawer}
                                className="p-2 hover:bg-nomadory-primary/5 rounded-full transition-colors text-nomadory-primary"
                                aria-label="Close cart"
                            >
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {isEmpty ? (
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                    <div className="w-24 h-24 mb-4 text-nomadory-primary/20">
                                        <svg
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium mb-2 text-nomadory-primary">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-nomadory-primary/60 mb-6">
                                        Add some beautiful rugs to get started
                                    </p>
                                    <button
                                        onClick={closeDrawer}
                                        className="btn btn-brand-primary bg-nomadory-secondary text-white w-full md:max-w-[350px]"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 space-y-4">
                                    {lines.map((line) => (
                                        <CartLineItem
                                            key={line.id}
                                            line={line}
                                            onUpdateQuantity={updateLineItem}
                                            onRemove={removeLineItem}
                                            isLoading={isLoading}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {!isEmpty && (
                            <div className="border-t border-nomadory-primary/10 p-6 space-y-4 bg-nomadory-background">
                                <div className="flex items-center justify-between text-xl font-medium text-nomadory-primary">
                                    <span>Subtotal</span>
                                    <span className="font-cormorant-garamond text-3xl">
                                        {formatPrice(subtotal, currencyCode)}
                                    </span>
                                </div>
                                <p className="text-sm text-nomadory-primary/60">
                                    Shipping and taxes calculated at checkout
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    disabled={!checkoutUrl || isLoading}
                                    className="btn bg-nomadory-secondary text-white hover:bg-nomadory-secondary/90 transition-all duration-700 w-full disabled:opacity-50"
                                >
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function CartLineItem({ line, onUpdateQuantity, onRemove, isLoading }) {
    const { merchandise, quantity } = line
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
        <div className="flex gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 bg-nomadory-primary/5">
                {image && (
                    <Image
                        src={image.url}
                        alt={image.altText || product.title}
                        fill
                        className="object-cover"
                    />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-2.5xl truncate text-nomadory-primary font-cormorant-garamond">
                    {product.title}
                </h3>

                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-nomadory-secondary/20">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={isLoading || quantity <= 1}
                            className="px-3 py-2 cursor-pointer hover:bg-nomadory-primary/5 disabled:opacity-50 disabled:cursor-not-allowed text-nomadory-primary"
                        >
                            <MinusIcon size={16} />
                        </button>
                        <span className="px-3 text-center text-nomadory-primary">
                            {quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={isLoading}
                            className="px-3 py-2 cursor-pointer hover:bg-nomadory-primary/5 disabled:opacity-50 disabled:cursor-not-allowed text-nomadory-primary"
                        >
                            <PlusIcon size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
                <p className="text-2.5xl text-nomadory-primary font-cormorant-garamond">
                    {formatPrice(
                        merchandise.price.amount,
                        merchandise.price.currencyCode
                    )}
                </p>
                <button
                    onClick={handleRemove}
                    disabled={isLoading}
                    className="text-sm mt-2 cursor-pointer text-nomadory-primary/60 hover:text-nomadory-primary underline disabled:opacity-50"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}
