'use client'
import { Chevron } from '../../icons'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'

const RelatedRugs = ({ relatedProducts }) => {
    const scrollContainerRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        }
    }

    useEffect(() => {
        checkScrollButtons()
        const scrollContainer = scrollContainerRef.current
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollButtons)
            window.addEventListener('resize', checkScrollButtons)

            return () => {
                scrollContainer.removeEventListener(
                    'scroll',
                    checkScrollButtons
                )
                window.removeEventListener('resize', checkScrollButtons)
            }
        }
    }, [])

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth',
            })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            })
        }
    }

    return (
        <div className="overflow-hidden">
            <div className="flex md:flex-row flex-col gap-8 items-center justify-between mb-6 md:mb-12">
                <h1 className="heading-1 font-normal">You May Also Like</h1>
                <div className="flex gap-6 self-end md:self-auto">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <Chevron.Left disabled={!canScrollLeft} />
                    </button>
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className="disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <Chevron.Right disabled={!canScrollRight} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide"
            >
                {relatedProducts.map((node) => {
                    const primaryImage = node.images[0]
                    const secondaryImage = node.images[1] || primaryImage

                    return (
                        <Link
                            href={`/rugs/${node.slug}`}
                            key={node.id}
                            title={node.title}
                            className="w-[200px] flex-shrink-0 group"
                        >
                            <div className="mb-6 w-[200px] h-[310px] overflow-hidden relative">
                                <img
                                    src={primaryImage}
                                    alt={node.title}
                                    width={200}
                                    height={310}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <Name name={node.title} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
export { RelatedRugs }

const Name = ({ name }) => {
    const parts = name.split(' ')
    const rest = parts.slice(1).join(' ')
    return (
        <div className="font-normal font-cormorant-garamond uppercase w-[200px] h-[58px] line-clamp-2">
            <span className="text-2xl leading-[29px]">{parts[0]}</span>
            {rest && (
                <span className="text-nomadory-primary/50 text-2xl leading-[29px]">
                    {' '}
                    {rest}
                </span>
            )}
        </div>
    )
}
