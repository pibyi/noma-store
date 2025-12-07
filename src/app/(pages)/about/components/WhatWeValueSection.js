'use client'

import { useState } from 'react'

const WhatWeValueSection = ({ items }) => {
    const [showAll, setShowAll] = useState(false)

    const displayedItems = showAll ? items : items.slice(0, 1)

    return (
        <div className="space-y-6 md:space-y-12 max-w-[342px]">
            <h1 className="heading-1 md:pb-4">What We Value</h1>
            {displayedItems.map((item, index) => (
                <div key={index} className="space-y-6">
                    <div className="text-base font-normal leading-6">
                        {item.number}
                    </div>
                    <div className="text-2xl font-normal leading-[29px] font-cormorant-garamond">
                        {item.title}
                    </div>
                    <div className="body-default text-justify">
                        {item.description}
                    </div>
                </div>
            ))}
            {items.length > 1 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="cursor-pointer text-nomadory-primary/50 text-lg leading-[27px] underline"
                >
                    {showAll ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    )
}

export { WhatWeValueSection }
