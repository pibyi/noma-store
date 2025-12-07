import Image from 'next/image'

const QualityWithCharacter = () => {
    return (
        <section className="flex flex-col md:flex-row gap-8 md:gap-32 h-full">
            <div className="max-w-[600px]">
                <h1 className="heading-1 mb-8 md:mb-32">
                    Quality with Character
                </h1>
                <div>
                    <Image
                        src="/images/artisian-portrait-fibers.png"
                        alt="Our Makers"
                        width={600}
                        height={800}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between h-full">
                <div className="md:heading-2 body-default max-w-[572px] md:mb-[290px]">
                    Our makers blend tradition with innovation, combining
                    materials, techniques, and textures to add depth to each
                    piece. Serving both boutique studios and global luxury
                    brands, they excel in large-scale production without
                    sacrificing handcrafted quality
                </div>
                <div className="md:block hidden">
                    <Image
                        src="/images/weaving-detail-tool.png"
                        alt="Our Makers"
                        width={330}
                        height={456}
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
export { QualityWithCharacter }
