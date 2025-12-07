'use client'

import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const ValuesSection = ({ values }) => {
    const [showAll, setShowAll] = useState(false)
    const isLargeScreen = useMediaQuery({ minWidth: 768 })

    const displayedValues = isLargeScreen
        ? values
        : showAll
          ? values
          : values.slice(0, 1)

    return (
        <div className="space-y-6 md:space-y-12 max-w-[458px] mx-auto">
            {displayedValues.map((value, index) => (
                <div key={index}>
                    <h3 className="text-3.5xl leading-[39px] mb-6 font-cormorant-garamond">
                        {value.title}
                    </h3>
                    <p className="body-default">{value.description}</p>
                </div>
            ))}
            {!isLargeScreen && values.length > 1 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-nomadory-primary/50 text-lg leading-[27px] underline"
                >
                    {showAll ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    )
}

export { ValuesSection }
