import Image from 'next/image'
import { Button } from '../../components'
import { ArrowRoundedRight } from '../../icons'
import Link from 'next/link'

const RugsStory = () => {
    const cards = [
        {
            image: '/images/journey-hands-yarn.png',
            title: 'The Hands',
        },
        {
            image: '/images/journey-hold-yarn.png',
            title: 'The Craft',
        },
    ]
    return (
        <div>
            <div className="flex md:flex-row flex-col gap-6 md:gap-32 justify-end mb-6 md:mb-16">
                <div className="w-full md:max-w-[436px]">
                    <h1 className="heading-1 mb-8 md:mb-16">
                        Every Rug Tells a Story
                    </h1>
                    <div className="heading-2 text-left md:text-justify mb-0 md:mb-[116px]">
                        Bespoke texture, handcrafted to elevate the spaces you
                        create
                    </div>
                    <div className="hidden md:block md:max-w-[358px] w-full">
                        <Link
                            href="/about"
                            className="btn-brand-secondary justify-start"
                        >
                            Explore Our Story <ArrowRoundedRight />
                        </Link>
                    </div>
                </div>
                <div className="space-y-6 w-full max-w-[615px]">
                    <div className="w-full max-w-[615px]">
                        <Image
                            src="/images/journey-carrying-yarn.png"
                            alt="Rugs story"
                            width={615}
                            height={800}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="text-2xl font-cormorant-garamond md:title">
                        The Journey
                    </div>
                </div>
            </div>
            <div className="flex gap-4 md:gap-6 w-full justify-between">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="space-y-4 md:space-y-6 w-full max-w-[540px]"
                    >
                        <div className="w-full max-w-[540px]">
                            <Image
                                src={card.image}
                                alt={card.title}
                                width={540}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="md:title text-2xl font-cormorant-garamond">
                            {card.title}
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:hidden block mt-8 md:mt-10">
                <Button.Secondary url="/about" label="Explore our story" />
            </div>
        </div>
    )
}

export { RugsStory }
