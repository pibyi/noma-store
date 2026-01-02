'use client'
import { Modal } from 'antd'
import { CheckIcon, CloseIcon, SearchIcon } from '../../../icons'
import { useState, useMemo, useCallback } from 'react'
import Image from 'next/image'

const ProductSearchModal = ({
    open,
    products,
    onClose,
    selectedProducts = [],
    onProductToggle,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value)
        const timeoutId = setTimeout(() => {
            setDebouncedSearchTerm(value.toLowerCase().trim())
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [])

    const availableProducts = useMemo(() => {
        if (!debouncedSearchTerm) return products

        return products.filter((product) => {
            const searchLower = debouncedSearchTerm
            const title = (product.title || '').toLowerCase()
            const description = (product.description || '').toLowerCase()
            const slug = (product.slug || '').toLowerCase()

            return (
                title.includes(searchLower) ||
                description.includes(searchLower) ||
                slug.includes(searchLower)
            )
        })
    }, [products, debouncedSearchTerm])

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width="100vw"
            centered={false}
            title={null}
            closeIcon={null}
            className="nomadory-product-modal"
            maskClosable={false}
            style={{
                top: 0,
                height: '100vh',
                maxWidth: '1440px',
                margin: '0 auto',
            }}
        >
            <div className="h-screen flex flex-col p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="heading-1 mt-4 mb-16">
                            Select your preferred rug
                        </h2>
                        <p className="text-lg text-nomadory-primary/50 text-justify tracking-wider mb-6">
                            Tap to select one or more items below
                        </p>
                        {selectedProducts?.length > 0 && (
                            <div className="text-sm italic text-nomadory-primary/50">
                                Chosen items will appear in Request form
                            </div>
                        )}
                    </div>
                    <button onClick={onClose} className="cursor-pointer mt-4">
                        <CloseIcon size={26} color="#221E1D" />
                    </button>
                </div>

                <div className="relative w-full px-2 py-6 mt-6">
                    <input
                        placeholder="Type your search"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="border-b pb-4 border-b-nomadory-primary/30 focus:border-b-nomadory-primary w-full text-sm h-12 focus:outline-0 tracking-wider"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pb-4">
                        <SearchIcon />
                    </div>
                </div>

                {selectedProducts?.length > 0 && (
                    <div className="flex items-center justify-between">
                        <div className="italic text-lg">
                            &quot;{selectedProducts?.length} rugs selected&quot;
                        </div>
                        <div
                            role="button"
                            onClick={() => onProductToggle(undefined, true)}
                            className="cursor-pointer text-nomadory-primary/50 text-lg underline"
                        >
                            Discard All
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto md:mt-12 mt-6">
                    {availableProducts.length === 0 && debouncedSearchTerm && (
                        <div className="text-center py-8 text-nomadory-primary/50">
                            No products found for &quot;{debouncedSearchTerm}
                            &quot;
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {availableProducts.map((rug) => {
                            const isSelected = selectedProducts?.includes(
                                rug.id
                            )
                            return (
                                <div
                                    href={`/rugs/${rug.slug}`}
                                    key={rug.id}
                                    title={rug.title}
                                    className="cursor-pointer max-w-[330px] flex-shrink-0 overflow-hidden whitespace-nowrap"
                                    onClick={() => onProductToggle(rug.id)}
                                    role="button"
                                >
                                    <div className="mb-6 relative">
                                        <Image
                                            src={rug.images[0]}
                                            alt={rug.title}
                                            width={330}
                                            height={500}
                                            className="w-full h-auto"
                                            quality={100}
                                        />
                                        {isSelected && (
                                            <div className="absolute inset-0 h-full w-full bg-nomadory-primary/50">
                                                <div className="flex items-center justify-center h-full w-full ">
                                                    <CheckIcon />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Name name={rug.title} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-between pt-4">
                    <button
                        onClick={onClose}
                        className="btn-brand-primary text-white border-0 w-full max-w-[170px] md:max-w-[350px] bg-nomadory-secondary/30 hover:bg-nomadory-secondary/50 hover:border-0"
                    >
                        Back to request
                    </button>
                    <button
                        onClick={onClose}
                        className="btn-brand-primary w-full md:max-w-[350px]  max-w-[170px]"
                        disabled={!selectedProducts?.length}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export { ProductSearchModal }

const Name = ({ name }) => {
    const parts = name.split(' ')
    const rest = parts.slice(1).join(' ')
    return (
        <div className="font-normal font-cormorant-garamond uppercase max-w-[300px] overflow-hidden text-ellipsis">
            <span className="text-2xl text-nomadory-primary leading-[29px]">
                {parts[0]}
            </span>
            {rest && (
                <span className="text-nomadory-primary/50 text-2xl leading-[29px]">
                    &nbsp;{rest}
                </span>
            )}
        </div>
    )
}
