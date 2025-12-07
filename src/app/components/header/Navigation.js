'use client'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MenuIcon,
    SearchIcon,
    ArrowLeftIcon,
    ArrowRoundedRight,
    CloseIcon,
} from '../../icons'
import Image from 'next/image'
import { LogoFull } from '../logo/logo'
import clsx from 'clsx'
import Link from 'next/link'

const NavigationMenu = ({ products }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [showCollaborate, setShowCollaborate] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    useEffect(() => {
        const rugsPageContainer = document.getElementById(
            'single-rugs-page-container'
        )
        if (isOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden'
            if (rugsPageContainer) {
                rugsPageContainer.style.zIndex = '-1'
            }
        } else {
            document.body.style.overflow = 'unset'
            if (rugsPageContainer) {
                rugsPageContainer.style.zIndex = 'unset'
            }
        }

        return () => {
            if (rugsPageContainer) {
                rugsPageContainer.style.zIndex = 'unset'
            }
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, isSearchOpen])

    const overlayVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const searchVariants = {
        initial: {
            opacity: 0,
            y: -20,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
        },
    }

    const handleCollaborateClick = () => {
        setShowCollaborate(true)
    }

    const handleBackClick = () => {
        setShowCollaborate(false)
    }

    const closeMenu = () => {
        setIsOpen(false)
        setIsSearchOpen(false)
        setShowCollaborate(false)
        setSearchQuery('')
    }
    const searchedProducts = useMemo(() => {
        const product = products.find((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        if (product) {
            return [product]
        }
        return []
    }, [products, searchQuery])

    const menuItems = [
        { label: 'RUGS', href: '/rugs' },
        { label: 'ABOUT US', href: '/about' },
        { label: 'THE MAKERS', href: '/the-makers' },
        { label: 'OUR PROJECTS', href: '/project-gallery' },
        {
            label: 'COLLABORATE',
            onClick: handleCollaborateClick,
            hasArrow: true,
        },
        { label: 'FAQ', href: '/faq' },
        { label: 'CONTACTS', href: '/contacts' },
    ]

    const collaborateItems = [
        { label: 'TRADE', href: '/collaborate/trade' },
        { label: 'BRAND', href: '/collaborate/brands' },
    ]

    return (
        <>
            <div className="flex items-center gap-9">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            key="search-icon"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                                duration: 0.25,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <div
                                onClick={() => {
                                    setIsOpen(false)
                                    setIsSearchOpen(!isSearchOpen)
                                }}
                                className="cursor-pointer"
                                role="button"
                            >
                                <SearchIcon />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={() => {
                        setIsSearchOpen(false)
                        setIsOpen(!isOpen)
                    }}
                    className="cursor-pointer"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    <MenuIcon isOpen={isOpen} />
                </button>
            </div>

            <AnimatePresence>
                {(isOpen || isSearchOpen) && (
                    <motion.div
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={clsx(
                            'fixed  inset-0 bg-black bg-opacity-50 z-40',
                            {
                                'top-[var(--nomadory-header-height)]':
                                    isSearchOpen,
                            }
                        )}
                        style={{ backgroundColor: 'rgba(34, 30, 29, 0.5)' }}
                        onClick={closeMenu}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        variants={searchVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="pt-6 md:pt-12 px-4 md:px-6 fixed z-[999999] bg-nomadory-background top-[calc(var(--nomadory-header-height)-1px)] left-0 right-0"
                    >
                        <button
                            aria-label="Close search"
                            onClick={() => {
                                setIsSearchOpen(false)
                                setSearchQuery('')
                            }}
                            className="cursor-pointer text-sm leading-[21px] mb-8 flex  justify-end w-full"
                        >
                            Close
                        </button>
                        <div className="pb-5 pt-6 relative">
                            <label
                                htmlFor="search"
                                className={clsx(
                                    'absolute left-4 text-sm text-nomadory-primary/50 transition-all duration-300 ease-in-out pointer-events-none',
                                    isSearchFocused || searchQuery
                                        ? 'top-1'
                                        : 'top-9'
                                )}
                            >
                                Type your search
                            </label>
                            <input
                                type="text"
                                id="search"
                                className="w-full text-sm focus:outline-none py-3 leading-[21px] border-b border-b-nomadory-primary/30 focus:border-b-nomadory-primary pl-4 pr-10 bg-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-nomadory-primary/50 hover:text-nomadory-primary transition-colors duration-200 cursor-pointer"
                                    aria-label="Clear search"
                                >
                                    <CloseIcon size={20} color="currentColor" />
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.2 }}
                                className="pb-16 mt-4"
                            >
                                {searchedProducts.length > 0 ? (
                                    searchedProducts.map((product) => (
                                        <Link
                                            href={`/rugs/${product.slug}`}
                                            key={product.id}
                                            onClick={() => closeMenu()}
                                            className="space-y-4"
                                        >
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                width={171}
                                                height={240}
                                            />
                                            <ProductName name={product.title} />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="flex items-center justify-center gap-4 text-center text-nomadory-primary/50 py-8 md:py-12">
                                        <SearchIcon size={20} /> No rugs
                                        available with "{searchQuery}"
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-4 bottom-0 left-0 w-full flex flex-col  z-[9999]"
                    >
                        {/* Menu content */}
                        <div className="px-4 md:px-6 pt-12 pb-6 md:py-10 max-w-[1440px] mx-auto w-full bg-[#fafaf8]">
                            <div className="flex flex-col justify-between">
                                <div className="flex justify-between mb-6 md:mb-16">
                                    <LogoFull />
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="cursor-pointer"
                                        aria-label={
                                            isOpen ? 'Close menu' : 'Open menu'
                                        }
                                    >
                                        <MenuIcon isOpen={isOpen} />
                                    </button>
                                </div>
                                <div>
                                    {!showCollaborate ? (
                                        <div className="flex justify-between h-[calc(100vh-160px)] max-h-[600px] md:max-h-[634px] overflow-y-auto">
                                            <nav>
                                                <ul className="space-y-6 md:space-y-[5.33vh] h-full flex flex-col">
                                                    {menuItems.map(
                                                        (item, index) => (
                                                            <motion.li
                                                                key={item.label}
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    delay:
                                                                        index *
                                                                        0.1,
                                                                    duration: 0.3,
                                                                    ease: 'easeInOut',
                                                                }}
                                                            >
                                                                {item.onClick ? (
                                                                    <button
                                                                        onClick={
                                                                            item.onClick
                                                                        }
                                                                        className="flex items-center gap-4 w-full text-left text-3.5xl font-medium text-nomadory-primary/50 hover:text-nomadory-primary transition-colors duration-200 focus:outline-none focus:underline group cursor-pointer font-cormorant-garamond leading-[39px] uppercase"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </span>
                                                                        {item.hasArrow && (
                                                                            <div className="transform transition-transform duration-200 group-hover:scale-125">
                                                                                <ArrowRoundedRight />
                                                                            </div>
                                                                        )}
                                                                    </button>
                                                                ) : (
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="block leading-[39px] text-3.5xl font-medium text-nomadory-primary/50 hover:text-nomadory-primary transition-colors font-cormorant-garamond duration-200 focus:outline-none focus:underline cursor-pointer tracking-[0%] uppercase"
                                                                        onClick={
                                                                            closeMenu
                                                                        }
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </a>
                                                                )}
                                                            </motion.li>
                                                        )
                                                    )}
                                                    <div className="flex gap-6 mt-auto">
                                                        <a
                                                            href="https://instagram.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-nomadory-primary/50 hover:text-nomadory-primary transition-colors duration-200 focus:outline-none focus:underline underline cursor-pointer"
                                                        >
                                                            Instagram
                                                        </a>
                                                        <a
                                                            href="https://linkedin.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-nomadory-primary/50 hover:text-nomadory-primary transition-colors duration-200 focus:outline-none focus:underline underline cursor-pointer"
                                                        >
                                                            LinkedIn
                                                        </a>
                                                    </div>
                                                </ul>
                                            </nav>
                                            <div className="hidden md:block">
                                                <Image
                                                    src="/images/loom-threads-green.webp"
                                                    alt="Loom threads green"
                                                    width={356}
                                                    height={540}
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <motion.nav
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeInOut',
                                            }}
                                        >
                                            <div className="h-full">
                                                <div className="flex  items-center justify-center mb-8 h-10 md:h-12 relative">
                                                    <button
                                                        onClick={
                                                            handleBackClick
                                                        }
                                                        className="absolute h-10 w-10 left-0 text-nomadory-primary hover:text-nomadory-primary/50 transition-colors duration-200 focus:outline-none focus:underline cursor-pointer"
                                                    >
                                                        <ArrowLeftIcon />
                                                    </button>
                                                    <span className="text-[18px] font-normal font-poppins text-nomadory-primary">
                                                        Collaborate
                                                    </span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <ul className="space-y-6 md:space-y-12 flex items-center flex-col md:justify-center">
                                                        {collaborateItems.map(
                                                            (item, index) => (
                                                                <motion.li
                                                                    key={
                                                                        item.label
                                                                    }
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: 20,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            index *
                                                                            0.1,
                                                                        duration: 0.3,
                                                                        ease: 'easeInOut',
                                                                    }}
                                                                >
                                                                    <a
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="block text-2.5xl md:text-3.5xl font-medium text-nomadory-primary/50 hover:text-nomadory-primary transition-colors duration-200 focus:outline-none focus:underline cursor-pointer font-cormorant-garamond leading-[100%] tracking-[0%] uppercase"
                                                                        onClick={
                                                                            closeMenu
                                                                        }
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </a>
                                                                </motion.li>
                                                            )
                                                        )}
                                                    </ul>
                                                    <div className="hidden md:block">
                                                        <Image
                                                            src="/images/loom-hands-weaving.webp"
                                                            alt="Loom threads green"
                                                            width={356}
                                                            height={540}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.nav>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export { NavigationMenu }

const ProductName = ({ name }) => {
    const parts = name.split(' ')
    const rest = parts.slice(1).join(' ')

    return (
        <h3
            title={name}
            className="font-cormorant-garamond text-2xl uppercase max-w-[170px] line-clamp-2"
        >
            <span className="text-nomadory-primary">{parts[0]}</span>
            {rest && (
                <span className="text-nomadory-primary/50 ml-2">{rest}</span>
            )}
        </h3>
    )
}
