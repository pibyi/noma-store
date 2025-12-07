'use client'
import { useState } from 'react'
import { AnimatedPlusIcon } from '../../components'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const FaqSection = ({ faqs }) => {
    const [openCategories, setOpenCategories] = useState({})
    const [openQuestions, setOpenQuestions] = useState({})

    const toggleCategory = (categoryTitle) => {
        setOpenCategories((prev) => ({
            ...prev,
            [categoryTitle]: !prev[categoryTitle],
        }))
    }

    const toggleQuestion = (questionId) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }))
    }

    return (
        <section>
            {faqs.map((node) => {
                const isCategoryOpen = openCategories[node.title]

                return (
                    <motion.div
                        key={node.title}
                        initial={false}
                        animate={{
                            marginBottom: isCategoryOpen ? 48 : 24,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        <h2
                            onClick={() => toggleCategory(node.title)}
                            className={clsx(
                                'cursor-pointer text-2xl leading-[29px] hover:leading-[39px] underline hover:no-underline font-cormorant-garamond hover:text-3.5xl transition-all duration-300 ease-out',
                                {
                                    'text-nomadory-primary/30 text-3.5xl':
                                        isCategoryOpen,
                                    'active:text-nomadory-primary/30 active:underline':
                                        !isCategoryOpen,
                                }
                            )}
                        >
                            {node.title}
                        </h2>
                        <motion.div
                            initial={false}
                            animate={{
                                height: isCategoryOpen ? 'auto' : 0,
                                opacity: isCategoryOpen ? 1 : 0,
                                paddingTop: isCategoryOpen ? 24 : 0,
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
                                paddingBottom: {
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1],
                                },
                            }}
                            className="overflow-hidden space-y-6"
                        >
                            {node.questions.map((question) => {
                                const isQuestionOpen =
                                    openQuestions[question.id]

                                return (
                                    <div key={question.id}>
                                        <div
                                            className="flex justify-between items-center gap-6 cursor-pointer"
                                            onClick={() =>
                                                toggleQuestion(question.id)
                                            }
                                        >
                                            <div className="body-default pr-4">
                                                {question.question}
                                            </div>
                                            <AnimatedPlusIcon
                                                isOpen={isQuestionOpen}
                                            />
                                        </div>
                                        <AnimatePresence initial={false}>
                                            {isQuestionOpen && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                        marginTop: 0,
                                                    }}
                                                    animate={{
                                                        height: 'auto',
                                                        opacity: 1,
                                                        marginTop: 24,
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                        marginTop: 0,
                                                    }}
                                                    transition={{
                                                        height: {
                                                            duration: 0.4,
                                                            ease: [
                                                                0.4, 0, 0.2, 1,
                                                            ],
                                                        },
                                                        opacity: {
                                                            duration: 0.3,
                                                            ease: 'easeInOut',
                                                        },
                                                        marginTop: {
                                                            duration: 0.4,
                                                            ease: [
                                                                0.4, 0, 0.2, 1,
                                                            ],
                                                        },
                                                    }}
                                                    className="body-small overflow-hidden"
                                                >
                                                    {question.answer}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </motion.div>
                    </motion.div>
                )
            })}
        </section>
    )
}
export { FaqSection }
