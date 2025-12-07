'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExpandIcon } from '../icons'
import clsx from 'clsx'

const Accordion = ({ title, details, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button
                onClick={toggleAccordion}
                className={clsx(
                    'w-full flex cursor-pointer items-center justify-between text-left focus:outline-none transition-colors duration-700',
                    {
                        'mb-4': isOpen,
                    }
                )}
            >
                <div className="text-base leading-6 font-medium">{title}</div>
                <div className="flex-shrink-0">
                    <ExpandIcon isOpen={isOpen} />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                                height: {
                                    duration: 0.4,
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    duration: 0.3,
                                    delay: 0.1,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                                height: {
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                },
                                opacity: {
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                },
                            },
                        }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div>
                            {Object.entries(details).map(([key, value], i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            delay: i * 0.08,
                                            duration: 0.3,
                                            ease: 'easeOut',
                                        },
                                    }}
                                    className="text-sm leading-[21px]"
                                >
                                    - {key}:{' '}
                                    {String(value)
                                        .replace(/,(\S)/g, ', $1')
                                        .replace(/\s+/g, ' ')
                                        .trim()}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { Accordion }
