'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import TrafficBars from './TrafficBars'

const CareInstructionsPage = () => {
    const [openCategories, setOpenCategories] = useState({ wool: true })

    const toggleCategory = (categoryId) => {
        setOpenCategories((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }))
    }

    const rugTypes = [
        {
            id: 'wool',
            title: 'Wool Rugs',
            instructions: [
                'The rug must be kept open for 1 to 2 days. If folded and then rolled; This will allow the creases and lines caused by the folding to disappear',
                'Rotate the rug every 3 months to avoid uneven facing and wear',
                'Avoid pulling lose yarn; If necessary clip them',
                'Vacuum regularly in one direction (no back and forth) using suction only, NO bristles. Regular vacuuming will reduce shedding over time',
                'Spot Clean as needed using a damp cloth with plain water (do not use soap or cleaning products)',
            ],
        },
        {
            id: 'silk',
            title: 'Silk & Silk Blend Rugs',
            instructions: [
                'Rotate the rug every 3 months to avoid uneven fading and wear',
                'Vacuum as needed using suction only, NO bristles',
                'Do not pull any loose threads; use trimmers to cut',
                'Remove and stains immediately by blotting with a clean undyed cloth',
                'Send to a professional service for cleaning; do not dry clean',
            ],
        },
        {
            id: 'jute',
            title: 'Jute Rugs',
            instructions: [
                'Rotate the rug every 3 months to avoid uneven facing and wear',
                'Avoid exposure to direct sunlight as this will cause fading to occur',
                'Vacuum as needed using a low-powered cleaner, without a beater brush',
                'Spot clean as needed with a damp white cloth and do not use cleaning products',
            ],
        },
        {
            id: 'tencel',
            title: 'Tencel Rugs',
            instructions: [
                'Rotate the rug every 3 months to avoid uneven fading and wear',
                'Vacuum as needed in one direction (no back and forth) using suction only, NO bristles',
                'Do not spot clean - never use liquids on tencel rugs',
                'To remove stains, send them to a professional service',
            ],
        },
        {
            id: 'linen',
            title: 'Linen',
            instructions: [
                'Rotate the rug every 3 weeks to avoid uneven fading and wear',
                'Vacuum as needed using suction only, NO bristles',
                'Spot as needed using a damp cloth with plain water. Do not use soap or additional cleaning products',
            ],
        },
        {
            id: 'sisal',
            title: 'Sisal',
            instructions: [
                'Rotate the rug every 6 months to a year to avoid fading and wear',
                'Avoid exposure to direct sunlight as it will fade the color of the rug',
                'Vacuum as needed using suction only and NO bristles',
                'Remove stains with a mixture of dishwashing liquid and lukewarm water. Do not rub the stain or it will spread and do not use any bleach',
            ],
        },
        {
            id: 'recycled-polyester',
            title: 'Recycled Polyester',
            instructions: [
                'Blot spills from the surface immediately and dab with a clean cloth',
                'Vacuum as needed using suction only, NO bristles',
                'Spot clean as needed using a damp cloth with plain water and using a deck brush',
                'For stubborn stain removal, chlorine bleach can be used if diluted with water correctly (1 part bleach to 2 parts water). Though this method should be considered a last resort',
            ],
        },
    ]

    const trafficGuide = [
        {
            id: 'high',
            level: 'High Traffic',
            description:
                'Ideal for entryways, hallways, stairs, family rooms, playrooms and kitchens. These rugs work well in rooms with considerable traffic and are designed for daily wear. Well suited for homes with children and pets.',
            traffic: 'high',
        },
        {
            id: 'medium',
            level: 'Medium Traffic',
            description:
                "Ideal for dining rooms, children's bedrooms and home offices. These rugs work well in rooms with moderate traffic but are not the primary thoroughfares of the home.",
            traffic: 'medium',
        },
        {
            id: 'low',
            level: 'Low Traffic',
            description:
                'Ideal for formal living rooms, master bedrooms, guest bedrooms and nurseries. These rugs work well in rooms with less traffic where luxe fibers will live beautifully.',
            traffic: 'low',
        },
    ]

    return (
        <main className="nomadory-container flex flex-col md:flex-row gap-32 mb-40">
            <section className="md:w-[39.1%]">
                <h1 className="heading-1 mb-8  md:mb-16">Care Instructions</h1>
                <p className="body-default max-w-[490px] text-justify mb-8 md:mb-12">
                    Each Nomadory rug is designed to last for generations.
                    Here&apos;s how to keep yours in its best condition.
                </p>
                <div>
                    {rugTypes.map((rug) => {
                        const isCategoryOpen = openCategories[rug.id]

                        return (
                            <motion.div
                                key={rug.id}
                                initial={false}
                                animate={{
                                    marginBottom: isCategoryOpen ? 48 : 36,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <h2
                                    onClick={() => toggleCategory(rug.id)}
                                    className={clsx(
                                        'cursor-pointer text-2xl leading-[29px] hover:leading-[39px] underline hover:no-underline font-cormorant-garamond hover:text-3.5xl transition-all duration-300 ease-out',
                                        {
                                            'active:text-nomadory-primary/30 active:underline':
                                                !isCategoryOpen,
                                        }
                                    )}
                                >
                                    {rug.title}
                                </h2>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isCategoryOpen ? 'auto' : 0,
                                        opacity: isCategoryOpen ? 1 : 0,
                                        paddingTop: isCategoryOpen ? 36 : 0,
                                    }}
                                    transition={{
                                        height: {
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1],
                                        },
                                        opacity: {
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        },
                                        paddingTop: {
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1],
                                        },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <ul className="body-default space-y-6 list-disc pl-6">
                                        {rug.instructions.map(
                                            (instruction, index) => (
                                                <li key={index}>
                                                    {instruction}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            <section className="w-full md:max-w-[690px] bg-nomadory-cream border border-nomadory-primary p-4 py-8 md:py-12 md:p-12 h-fit">
                <p className="body-small text-justify mb-8 md:mb-12 max-w-[317px] md:max-w-[490px]">
                    Understanding how your rug will perform in different
                    settings helps you choose the perfect piece for your home.
                </p>
                <h2 className="text-5xl font-cormorant-garamond mb-8 md:mb-12">
                    Rug Traffic Guide
                </h2>

                <div className="hidden md:block gapy-y-6 md:space-y-12">
                    {trafficGuide.map((guide) => (
                        <div
                            key={guide.id}
                            className="flex flex-col md:flex-row gap-12 items-start"
                        >
                            <div className="flex-shrink-0">
                                <TrafficBars traffic={guide.traffic} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-cormorant-garamond mb-9">
                                    {guide.level}
                                </h3>
                                <p className="body-default">
                                    {guide.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Layout - accordion style */}
                <div className="md:hidden space-y-8">
                    {trafficGuide.map((guide) => {
                        const isOpen = openCategories[guide.id]

                        return (
                            <motion.div
                                key={guide.id}
                                initial={false}
                                animate={{
                                    marginBottom: isOpen ? 24 : 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <div
                                    onClick={() => toggleCategory(guide.id)}
                                    className="cursor-pointer flex flex-col items-start gap-4"
                                >
                                    <TrafficBars traffic={guide.traffic} />
                                    <h3 className="text-2xl font-cormorant-garamond underline">
                                        {guide.level}
                                    </h3>
                                </div>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: isOpen ? 'auto' : 0,
                                        opacity: isOpen ? 1 : 0,
                                        paddingTop: isOpen ? 24 : 0,
                                    }}
                                    transition={{
                                        height: {
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1],
                                        },
                                        opacity: {
                                            duration: 0.3,
                                            ease: 'easeInOut',
                                        },
                                        paddingTop: {
                                            duration: 0.5,
                                            ease: [0.4, 0, 0.2, 1],
                                        },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <p className="body-default text-justify">
                                        {guide.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default CareInstructionsPage
