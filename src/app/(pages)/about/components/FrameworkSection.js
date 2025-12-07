'use client'

import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const FrameworkSection = ({ steps }) => {
    const [showAll, setShowAll] = useState(false)
    const isLargeScreen = useMediaQuery({ minWidth: 768 })

    const displayedSteps = isLargeScreen
        ? steps
        : showAll
          ? steps
          : steps.slice(0, 1)

    return (
        <div className="space-y-6 md:space-y-12 w-full max-w-[656px] ml-auto">
            {displayedSteps.map((step, index) => (
                <div className="md:flex w-full" key={index}>
                    <div className="flex gap-6 w-full mb-8 md:mb-0">
                        <span>{step.number}</span>
                        <h3 className="text-3.5xl leading-[39px] font-cormorant-garamond max-w-[280px]">
                            {step.title}
                        </h3>
                    </div>
                    <div className="flex gap-8 w-full">
                        <p className="body-default text-justify max-w-[296px]">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
            {!isLargeScreen && steps.length > 1 && (
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

export { FrameworkSection }
