'use client'
import { motion } from 'framer-motion'

const MenuIcon = ({ isOpen }) => {
    return (
        <div className="w-8 h-[22px] flex flex-col justify-between cursor-pointer">
            {/* Top bar */}
            <motion.span
                className="w-full h-[1px] bg-nomadory-primary block origin-center"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 10.5 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />

            {/* Middle bar */}
            <motion.span
                className="w-full h-[1px] bg-nomadory-primary block"
                animate={{
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0 : 1,
                }}
                transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />

            {/* Bottom bar */}
            <motion.span
                className="w-full h-[1px] bg-nomadory-primary block origin-center"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -10.5 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                }}
            />
        </div>
    )
}

export { MenuIcon }
