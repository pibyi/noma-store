'use client'
import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { RequestPricing } from '@/app/components'

const TradePageClient = ({ products }) => {
    const [showAllSteps, setShowAllSteps] = useState(false)

    return (
        <section>
            <div className="font-cormorant-garamond max-w-[800px] ml-auto text-3.5xl leading-[39px] mb-6 md:mb-16">
                From the first sketch to final placement, we walk with you
                through every step of the process
            </div>
            <div className="flex justify-between w-full">
                <div className="w-full max-w-[656px] ml-auto">
                    {frameworkSteps.map((step, index) => (
                        <div
                            className={clsx(
                                'flex md:flex-row flex-col gap-2.5 md:gap-0 w-full',
                                'transition-all duration-500 ease-in-out',
                                // On large screens, always show all steps
                                'md:opacity-100 md:max-h-[500px] md:mb-12',
                                // On small screens, apply conditional visibility
                                {
                                    'opacity-100 max-h-[500px] mb-6':
                                        index === 0 || showAllSteps,
                                    'opacity-0 max-h-0 overflow-hidden mb-0':
                                        index > 0 && !showAllSteps,
                                }
                            )}
                            key={index}
                        >
                            <div className="flex md:flex-row flex-col gap-2.5 md:gap-6 w-full">
                                <span>{step.number}</span>
                                <h3 className="text-3.5xl leading-[39px] font-cormorant-garamond max-w-[280px]">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="body-default md:max-w-[296px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                    <button
                        className="text-nomadory-primary/50 text-lg leading-[27px] underline md:hidden  mb-6"
                        onClick={() => setShowAllSteps(!showAllSteps)}
                    >
                        {showAllSteps ? 'Read Less' : 'Read More'}
                    </button>
                    <div className="block md:hidden">
                        <RequestPricing
                            label="Let's collaborate"
                            products={products}
                            params={{ defaultClientType: 'trade-partner' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const frameworkSteps = [
    {
        number: '01',
        title: 'Collaboration & Concepting',
        description:
            'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
    },
    {
        number: '02',
        title: 'Production & Procurement',
        description:
            'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
    },
    {
        number: '03',
        title: 'Traceability & Transparency',
        description:
            'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
    },
    {
        number: '04',
        title: 'Delivery You Can Count On',
        description:
            'From artisan workshop to site installation, we manage end-to-end logistics to align with your project timelines.',
    },
]

export { TradePageClient }
