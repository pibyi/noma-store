import Image from 'next/image'

const OurMakers = () => {
    return (
        <section>
            <h1 className="heading-1 mb-8 md:mb-16">Our Makers</h1>
            <div className="mb-6 md:mb-12">
                <div className="max-w-[250px] md:max-w-[424px] md:mx-auto  text-2xl tracking-[0.08em] text-justify font-normal leading-[36px] mb-6 md:mb-12">
                    At Nomadory, every rug tells a story — not just of design
                    and decor, but of heritage, craftsmanship, and human
                    connection
                </div>
                <div className="max-w-[229px] md:max-w-[428px] ml-auto md:mx-auto text-lg leading-[27px] text-justify">
                    Across the weaving landscapes of India — from the valleys of
                    Kashmir to the pink-hued streets of Jaipur and the historic
                    looms of Bhadohi — we work with artisan communities whose
                    craft has been passed down across generations
                </div>
            </div>
            <div className="max-w-[800px] mx-auto">
                <Image
                    src="/images/loom-weaving-closeup-hands.png"
                    alt="Our Makers"
                    width={800}
                    height={1000}
                />
            </div>
        </section>
    )
}
export { OurMakers }
