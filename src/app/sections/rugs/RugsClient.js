'use client'

import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ProductName } from '../../components'

const RugsClient = ({ rugs }) => {
    const [view, setView] = useState(4)

    return (
        <>
            <div className="flex items-center justify-end gap-3 ml-auto mb-6 md:mb-16">
                <div className="text-base text-black">View</div>
                <button
                    disabled={view === 4}
                    className={clsx('cursor-pointer transition-colors', {
                        'text-black': view === 4,
                        'text-[#00000080] hover:text-black': view !== 4,
                    })}
                    onClick={() => setView(4)}
                >
                    <span className="hidden md:inline">4</span>
                    <span className="inline md:hidden">2</span>
                </button>
                <button
                    disabled={view === 2}
                    className={clsx('cursor-pointer transition-colors', {
                        'text-black': view === 2,
                        'text-[#00000080] hover:text-black': view !== 2,
                    })}
                    onClick={() => setView(2)}
                >
                    <span className="hidden md:inline">2</span>
                    <span className="inline md:hidden">1</span>
                </button>
            </div>
            <div
                className={clsx('grid gap-x-4 md:gap-x-6 gap-y-6 md:gap-y-12', {
                    'grid-cols-1 md:grid-cols-2': view === 2,
                    'grid-cols-2 md:grid-cols-4': view === 4,
                })}
            >
                {rugs.map((rug) => {
                    const imageUrl = rug.thumbnail || rug.images?.[0]
                    return (
                        <Link
                            href={`/rugs/${rug.slug}`}
                            key={rug.id || rug.slug}
                        >
                            <Image
                                src={imageUrl}
                                alt={rug.title}
                                width={330}
                                height={500}
                                className="w-full h-auto transition-transform duration-300 hover:scale-110"
                                quality={100}
                            />
                            <div className="title mt-4 md:mt-8">
                                <ProductName name={rug.title} />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default RugsClient
