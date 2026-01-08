'use client'

import { useState } from 'react'

export default function AddToCartButton({
    variantId,
    onAddToCart,
    disabled = false,
}) {
    const [isAdding, setIsAdding] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const handleClick = async () => {
        if (isAdding || disabled) return

        setIsAdding(true)
        setShowSuccess(false)

        const result = await onAddToCart(variantId)

        setIsAdding(false)

        if (result?.success) {
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 2000)
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled || isAdding}
            className="w-full btn bg-nomadory-secondary text-white hover:bg-nomadory-secondary/90 transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed block"
        >
            {isAdding ? (
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    ADDING...
                </span>
            ) : showSuccess ? (
                <span className="flex items-center justify-center gap-2">
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    ADDED!
                </span>
            ) : (
                'ADD TO CART'
            )}
        </button>
    )
}
