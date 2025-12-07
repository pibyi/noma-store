const { default: Image } = require('next/image')

const WovenByTradition = () => {
    return (
        <section>
            <div className="flex flex-col md:flex-row gap-8 md:gap-32 mb-4 md:mb-12">
                <div className="md:max-w-[440px] md:ml-[100px]">
                    <h1 className="heading-1 mb-8 md:mb-16">
                        Woven by <br />
                        Tradition
                    </h1>
                    <div className="text-lg text-justify md:heading-2 mb-6 md:mb-0 ml-auto max-w-[258px] md:max-w-none w-full">
                        Our rugs are born from artisans whose skills pass from
                        parent to child. Drawing on Persian-inspired
                        craftsmanship and generations of expertise, they honour
                        the art of hand-knotting, reviving time-honoured
                        techniques while embracing innovative materials
                    </div>
                </div>
                <div className="flex gap-4 md:gap-16">
                    <div>
                        <Image
                            src="/images/hand-knotting-hands.png"
                            alt="Woven by Tradition"
                            width={330}
                            height={460}
                        />
                    </div>
                    <div>
                        <Image
                            src="/images/loom-threads-green.png"
                            alt="Woven by Tradition"
                            width={330}
                            height={460}
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-4 md:gap-16">
                <div>
                    <Image
                        src="/images/hand-detail-pattern.png"
                        alt="Woven by Tradition"
                        width={330}
                        height={460}
                    />
                </div>
                <div>
                    <Image
                        src="/images/loom-woman-tradfitional.png"
                        alt="Woven by Tradition"
                        width={330}
                        height={460}
                    />
                </div>
            </div>
        </section>
    )
}

export { WovenByTradition }
