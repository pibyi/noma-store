'use client'
import { motion } from 'framer-motion'

const AnimatedPlusIcon = ({ isOpen }) => {
    return (
        <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 min-w-[21px] min-h-[21px]"
        >
            {/* Vertical line - fades out when open */}
            <motion.path
                d="M10.5 0V20"
                stroke="#221E1D"
                strokeLinecap="round"
                animate={{
                    opacity: isOpen ? 0 : 1,
                }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            />
            {/* Horizontal line - animates from center to top when open */}
            <motion.line
                x1="1"
                x2="20"
                stroke="#221E1D"
                strokeLinecap="round"
                animate={{
                    y1: isOpen ? 0 : 10,
                    y2: isOpen ? 0 : 10,
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />
        </svg>
    )
}

export { AnimatedPlusIcon }
