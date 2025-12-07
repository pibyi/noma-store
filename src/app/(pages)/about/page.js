import { ArrowRoundedRight } from '../../icons'
import Image from 'next/image'
import Link from 'next/link'
import { ValuesSection } from './components/ValuesSection'
import { FrameworkSection } from './components/FrameworkSection'
import { WhatWeValueSection } from './components/WhatWeValueSection'

const AboutPage = async () => {
    const frameworkSteps = [
        {
            number: '01',
            title: 'Collaboration & Concepting',
            description:
                'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
        },
        {
            number: '02',
            title: 'Production & Procurement',
            description:
                'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
        },
        {
            number: '03',
            title: 'Traceability & Transparency',
            description:
                'Share your moodboards, swatches, or simple sketches. Together, we define the creative direction.',
        },
        {
            number: '04',
            title: 'Delivery You Can Count On',
            description:
                'From artisan workshop to site installation, we manage end-to-end logistics to align with your project timelines.',
        },
    ]

    const values = [
        {
            title: 'Ethical transparency',
            description:
                'We use natural dyes, local materials, and small-batch production to respect the Earth and those who live on it',
        },
        {
            title: 'Craft and collaboration',
            description:
                'Our strength lies in curating skilled artisans and forging deep partnerships—bridging design vision and production excellence',
        },
        {
            title: 'Modern efficiency',
            description:
                'Technology is our ally. We enhance traditional craft practices with end-to-end digital oversight—from order placement to logistics',
        },
    ]
    const ourValues = [
        {
            order: 1,
            title: 'Transparent Supply Chains',
            description:
                'We map every stage—from raw materials in Bhadohi, India, to delivery in your showroom—so you can confidently present the full story behind each rug ',
        },
        {
            order: 2,
            title: 'Ethical Partnerships',
            description:
                'We vet suppliers based on labor standards, sustainability efforts, and artisanal capability. Our relationships are built on trust, accountability, and respect.',
        },
        {
            order: 3,
            title: 'Designer-Led Collaboration',
            description:
                "Work directly with our team to translate your design intent—whether adapting an existing Nomadory concept or co-designing from scratch. We're here to support your creative process at every step.",
        },
        {
            order: 4,
            title: 'Craftsmanship Curated',
            description:
                "Our rugs are small-batch, handcrafted works—each one a confluence of artisanal skill and modern design, brought together for the interior designer's discerning eye.",
        },
        {
            order: 5,
            title: 'Digital Efficiency for Creatives',
            description:
                'With real-time visibility into production timelines, cost structures, and logistics, we empower designers and brands to plan with precision and confidence.',
        },
    ]

    return (
        <div className="nomadory-container space-y-20 md:space-y-40 mb-40">
            <section>
                <h1 className="heading-1 max-w-[456px] mb-8 md:mb-16 mx-auto text-center">
                    The Story Behind the Threads
                </h1>
                <p className="heading-2 max-w-[528px] mx-auto text-center mb-6 md:mb-12">
                    We believe that every rug carries a story. This is ours.
                </p>
                <div className="flex justify-center">
                    <Image
                        src="/images/loom-macro-wool.png"
                        alt="Macro view of wool on loom showing intricate weaving details"
                        width={800}
                        height={1000}
                        className="object-cover"
                    />
                </div>
            </section>
            <section>
                <h2 className="heading-1 md:max-w-[250px] mx-auto mb-8 md:mb-16">
                    Our Story{' '}
                </h2>
                <div className="md:text-center heading-2 text-justify md:max-w-screen max-w-[244px] mb-6 md:mb-12">
                    It all started with a single thread
                </div>
                <div className="body-default text-justify max-w-[256px] md:max-w-[400px] ml-auto md:mx-auto">
                    <p>
                        Founded in 2019 by Akta Adani and Vrnda Dalal in
                        San Francisco, Nomadory was born out of a shared vision:
                        to bring clarity, ethics, and craftsmanship to the world
                        of rug production. 
                    </p>
                    <p>
                        We saw an opportunity to revolutionize long, opaque
                        supply chains by creating a digital-first, transparent
                        connection from craft to client.
                    </p>
                </div>
            </section>
            <section>
                <h2 className="heading-1 mb-8 md:mb-16">Why We Exist</h2>
                <ValuesSection values={values} />
            </section>
            <section>
                <div className="md:flex gap-32">
                    <div className="space-y-6 md:space-y-12 max-w-[342px]">
                        <WhatWeValueSection items={ourValues} />
                        {/* <div className="text-base font-normal leading-6">
                            01
                        </div>
                        <div className="text-2xl font-normal leading-[29px] font-cormorant-garamond">
                            Transparent Supply Chains
                        </div>
                        <div className="body-default text-justify">
                            We map every stage—from raw materials in Bhadohi,
                            India, to delivery in your showroom—so you can
                            confidently present the full story behind each rug
                        </div>
                        <button className="text-nomadory-primary/50 text-lg leading-[27px] underline">
                            Read More
                        </button> */}
                    </div>
                    <div className="relative hidden md:block">
                        <Image
                            src="/images/artisan-loom-process.png"
                            alt="Artisan working at loom with yarn spools in background"
                            width={330}
                            height={428}
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-[#FFFDFD]">
                <div className="md:flex justify-between w-full">
                    <h2 className="heading-1 mb-8">
                        Our Design-to-Delivery Framework
                    </h2>
                    <FrameworkSection steps={frameworkSteps} />
                </div>
            </section>

            <section className="space-y-8 md:space-y-12">
                <div className="md:flex justify-between space-y-6 md:space-y-0">
                    <div className="max-w-[460px]">
                        <h2 className="heading-1 mb-8 md:mb-16">
                            Designed for Designers & Brands
                        </h2>
                        <p className="text-lg leading-[27px] md:heading-2 md:text-justify max-w-[376px]">
                            We specialize in seamless integration with the A&D
                            community: from bespoke installations to curated
                            small-run pieces, every project is crafted to
                            reflect your expertise—and ours 
                        </p>
                    </div>
                    <div>
                        <div className="flex  gap-4 md:gap-16">
                            <div>
                                <Image
                                    src="/images/hand-weaving-tool.png"
                                    alt="Close-up of hands working with weaving tools"
                                    width={330}
                                    height={460}
                                    className="object-contain w-full"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/images/loom-detail-threads.png"
                                    alt="Close-up of woven fabric on loom"
                                    width={330}
                                    height={460}
                                    className="object-contain w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-end gap-8 md:gap-16">
                    <div className="max-w-[432px] font-cormorant-garamond text-4xl leading-[44px]">
                        Curious how we can support your next project?
                    </div>
                    <div className="max-w-[358px] body-default">
                        <ul className="list-disc space-y-6 ml-4">
                            <li>
                                Trade partners: Start your creative
                                collaboration
                            </li>
                            <li>
                                Brands: Learn how we build transparent, ethical
                                supply chains
                            </li>
                        </ul>
                        <Link
                            className="btn-brand-primary mt-10 md:mt-20 w-full"
                            href="/collaborate"
                        >
                            Let&apos;s Collaborate
                        </Link>
                    </div>
                </div>
            </section>

            <section>
                <div className="flex flex-col md:flex-row gap-6 md:gap-32">
                    <div className="order-2 md:order-1">
                        <Image
                            src="/images/loom-hands-closeup.png"
                            alt="Close-up of hands working with golden threads on loom"
                            width={800}
                            height={900}
                            className="object-cover"
                        />
                    </div>
                    <div className="md:max-w-[362px] order-1 md:order-2">
                        <h2 className="heading-1 text-center md:text-left mb-8 md:mb-16">
                            A Commitment to Impact
                        </h2>
                        <p className="md:heading-2 text-lg text-center md:text-left">
                            We believe that informed, intentional sourcing is
                            not just better design—it&apos;s better for people
                            and the planet. Through every rug we create, we
                            honor that responsibility.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-10 md:space-y-20">
                <h2 className="heading-1 max-w-3xl">
                    Let&apos;s connect and craft something exceptional—together.
                </h2>
                <div className="max-w-[325px]">
                    <Link href="/rugs" className="btn-brand-secondary">
                        Discover the Collection <ArrowRoundedRight />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
