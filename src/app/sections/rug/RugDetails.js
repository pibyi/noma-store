'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Accordion, RequestPricing } from '../../components'
import AddToCartButton from '../../components/cart/AddToCartButton'
import { useCart } from '../../components/cart/CartProvider'
import { formatPrice } from '../../lib/formatters'

const RugDetails = ({ product, products }) => {
    const { addToCart } = useCart()
    const handleAddToCart = async (variantId) => {
        return await addToCart(variantId, 1)
    }

    return (
        <div>
            <h1 className="mb-10 md:mb-16 font-poppins">
                <Name name={product.title} />
                <div className="">
                    {product.sku && (
                        <h3 className="font-poppins font-normal text-sm uppercase tracking-wider text-nomadory-primary/70">
                            SKU - {product.sku}
                        </h3>
                    )}
                    {product.designer && (
                        <Link
                            href={`/designers/${product.designer.handle}`}
                            className="font-poppins font-normal text-sm tracking-wider text-nomadory-primary hover:text-nomadory-primary transition-colors"
                        >
                            Designed by{' '}
                            <span className="font-semibold underline uppercase">
                                {product.designer.title}
                            </span>
                        </Link>
                    )}
                </div>
            </h1>
            {product.description && (
                <div className="max-w-[484px] font-poppins text-lg md:text-xl text-nomadory-primary/100 font-[400] text-justify mb-10 md:mb-20 leading-[30px]">
                    {product.description}
                </div>
            )}

            {/* Display new metafields if available */}
            {/* {(product.sku ||
                product.details?.material ||
                product.details?.technique ||
                product.details?.backing ||
                product.details?.traffic ||
                product.details?.useCases ||
                product.details?.sustainabilityTag) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 md:mb-20">
                    {product.sku && (
                        <div className="space-y-1">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                SKU
                            </h3>
                            <p className="text-nomadory-primary/100 font-mono">
                                {product.sku}
                            </p>
                        </div>
                    )}
                    {product.details.material && (
                        <div className="space-y-1">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Material
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.material}
                            </p>
                        </div>
                    )}
                    {product.details.technique && (
                        <div className="space-y-1">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Technique
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.technique}
                            </p>
                        </div>
                    )}
                    {product.details.backing && (
                        <div className="space-y-1">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Backing
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.backing}
                            </p>
                        </div>
                    )}
                    {product.details.traffic && (
                        <div className="space-y-1">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Traffic
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.traffic}
                            </p>
                        </div>
                    )}
                    {product.details.useCases && (
                        <div className="space-y-1 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Use Cases / Application
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.useCases}
                            </p>
                        </div>
                    )}
                    {product.details.sustainabilityTag && (
                        <div className="space-y-1 md:col-span-2">
                            <h3 className="font-poppins font-semibold text-sm uppercase tracking-wider text-nomadory-primary/70">
                                Sustainability
                            </h3>
                            <p className="font-poppins text-nomadory-primary/100">
                                {product.details.sustainabilityTag}
                            </p>
                        </div>
                    )}
                </div>
            )} */}

            {product.isPurchasable && (
                <div className="mb-8">
                    <p className="text-sm font-poppins text-nomadory-primary/60">
                        Price
                    </p>
                    <p className="text-3xl md:text-5xl font-normal font-cormorant-garamond text-nomadory-primary">
                        {formatPrice(product.price, product.currencyCode)}
                    </p>
                    {!product.availableForSale && (
                        <p className="text-nomadory-danger text-sm font-poppins mt-2">
                            Currently out of stock
                        </p>
                    )}
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center w-full gap-3 md:pr-20 mb-6 md:mb-12">
                {product?.isPurchasable && (
                    <AddToCartButton
                        variantId={product.variantId}
                        onAddToCart={handleAddToCart}
                        disabled={!product.availableForSale}
                    />
                )}
                <RequestPricing products={products} />
            </div>

            <div className="md:hidden flex gap-4 mb-8">
                {product.images.map((url) => (
                    <div className="w-full" key={url}>
                        <Image
                            width={170}
                            height={240}
                            src={url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {product.details && (
                    <Accordion
                        title="Product Details"
                        details={product.details}
                    />
                )}
                <div>
                    <Link
                        href="/care-instructions"
                        className="w-full flex items-center justify-between text-left hover:opacity-70 transition-opacity duration-200 pb-4"
                    >
                        <div className="text-base leading-6 font-medium">
                            Care Advice
                        </div>
                        <div className="text-base">→</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export { RugDetails }

const Name = ({ name }) => {
    const parts = name.split(' ')
    const rest = parts.slice(1).join(' ')
    return (
        <div className="font-normal font-cormorant-garamond uppercase">
            <span className="text-3.5xl leading-[39px] md:text-5xl md:leading-[58px]">
                {parts[0]}
            </span>
            {rest && (
                <span className="text-nomadory-primary/50 text-3.5xl md:text-5xl leading-[39px] md:leading-[58px] ml-2">
                    {' '}
                    {rest}
                </span>
            )}
        </div>
    )
}
