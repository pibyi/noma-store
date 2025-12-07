'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RequestPricing } from '../../../components'

const BrandsPageClient = ({ products }) => {
    const [showAllSteps, setShowAllSteps] = useState(false)

    return (
        <section>
            <div className="flex justify-between">
                <h1 className="heading-1">How we Work Together</h1>
                <div className="max-w-[635px] space-y-6 md:space-y-12">
                    <AnimatePresence mode="wait">
                        {points.slice(0, 1).map((node) => (
                            <motion.div
                                key={`first-${node.id}`}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-16"
                            >
                                <div className="flex gap-2.5">
                                    <div className="text-base font-medium">
                                        {node.order}
                                    </div>
                                    <div className="text-3.5xl font-cormorant-garamond max-w-[178px]">
                                        {node.title}
                                    </div>
                                </div>
                                <div className="body-default max-w-[300px]">
                                    {node.description}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showAllSteps && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                }}
                                className="space-y-6 md:space-y-12"
                            >
                                {points.slice(1).map((node, index) => (
                                    <motion.div
                                        key={node.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: index * 0.1,
                                            ease: 'easeOut',
                                        }}
                                        className="flex gap-16"
                                    >
                                        <div className="flex gap-2.5">
                                            <div className="text-base font-medium">
                                                {node.order}
                                            </div>
                                            <div className="text-3.5xl font-cormorant-garamond max-w-[178px]">
                                                {node.title}
                                            </div>
                                        </div>
                                        <div className="body-default max-w-[300px]">
                                            {node.description}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full flex justify-end items-end">
                        <motion.button
                            className="cursor-pointer text-nomadory-primary/50 text-lg leading-[27px] underline mb-6"
                            onClick={() => setShowAllSteps(!showAllSteps)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showAllSteps ? 'Read Less' : 'Read More'}
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const points = [
    {
        id: 1,
        order: '01',
        title: 'Concept & Design',
        description:
            'Bring your ideas, sketches, or mood boards. Our design team collaborates with you to refine and prepare production-ready plans.',
    },
    {
        id: 2,
        order: '02',
        title: 'Material Selection',
        description:
            'Choose from our curated selection of premium materials and colors that align with your vision and sustainability goals.',
    },
    {
        id: 3,
        order: '03',
        title: 'Production Planning',
        description:
            'We create detailed production timelines and coordinate with our artisan partners to ensure quality and delivery schedules.',
    },
    {
        id: 4,
        order: '04',
        title: 'Artisan Crafting',
        description:
            'Our skilled artisans bring your design to life using traditional techniques, with regular updates on progress.',
    },
    {
        id: 5,
        order: '05',
        title: 'Quality & Delivery',
        description:
            'Each piece undergoes rigorous quality checks before being carefully packaged and delivered to your specifications.',
    },
]

export { BrandsPageClient }
