const { default: Image } = require('next/image')

const CenteredInCommunity = () => {
    return (
        <section className="flex flex-col md:flex-row gap-8 md:gap-32">
            <div>
                <h1 className="heading-1 mb-8 md:mb-16 max-w-[540px]">
                    Centered in Community
                </h1>
                <div>
                    <div className="md:hidden mb-6">
                        <Image
                            src="/images/artisian-yarn-prep.png"
                            alt="Our Makers"
                            width={724}
                            height={800}
                        />
                    </div>
                    <p className="body-default max-w-[302px] mx-auto md:ml-auto md:max-w-[492px]">
                        From family-run workshops to cooperatives supporting
                        women weavers, our partners are rooted in their
                        communities. From villages near Jaipur to studios in
                        Bhadohi, each rug is crafted through skilled hands and
                        shared values
                    </p>
                </div>
            </div>
            <div className="hidden md:block">
                <Image
                    src="/images/artisian-yarn-prep.png"
                    alt="Our Makers"
                    width={724}
                    height={800}
                />
            </div>
        </section>
    )
}
export { CenteredInCommunity }
