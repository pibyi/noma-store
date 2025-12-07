import Link from 'next/link'
import { FaqSection } from '../../sections'
import { ArrowRightIcon, ArrowRoundedRight } from '../../icons'

const FrequentlyAskedQuestionsPage = () => {
    const faqs = [
        {
            title: 'Samples & Custom Projects',
            questions: [
                {
                    id: 1,
                    question: 'Are rug samples available to be purchased?',
                    answer: 'Yes, rug swatches can be purchased. Please reach out to our team at sales@nomadory.com to inquire about available rug swatches.',
                },
                {
                    id: 2,
                    question: 'How do I start a custom rug project?',
                    answer: 'Please reach out to our team at sales@nomadory.com with details (shop drawings, moodboards, inspirations, links) regarding your custom project and they will be in touch regarding next steps.',
                },
                {
                    id: 3,
                    question:
                        'Can Nomadory design rugs for me based off of my moodboards and inspiration files?',
                    answer: 'If you do not have a specific design in mind and would like Nomadory to create rug design options for you, please contact our team at sales@nomadory.com and we can work with you to understand the level of design assistance that you require.',
                },
                {
                    id: 4,
                    question:
                        'Can I select a rug from the Nomadory collection and customize the color, size and shape?',
                    answer: 'Yes, all rugs in our Nomadory assortment can be customized to any color (ARS, Pantone TPX/TPG) and size. Shape customizations will be based on rug construction. Please reach out to our team at sales@nomadory.com to inquire about available options.',
                },
                {
                    id: 5,
                    question:
                        'How can we select the colors that we want to use?',
                    answer: 'Nomadory uses the ARS 1400 wool color system to color match and to select colors. If you do not have access to the ARS color system, please provide Pantone TPX/TPG color references and we will do our best to match them to appropriate ARS color codes.',
                },
                {
                    id: 6,
                    question:
                        'Will the Nomadory team be able to recommend certain fiber and rugs constructions based on usage?',
                    answer: 'Based on your custom project and needs, our sales team will recommend the most appropriate type of rug and fiber that meets your requirements.',
                },
                {
                    id: 7,
                    question: 'Are any of your designs available in stock?',
                    answer: 'All rugs are made to order. Nomadory does not stock any inventory of its own assortment.',
                },
                {
                    id: 8,
                    question:
                        'What are the average production lead times for a rug?',
                    answer: 'Average lead times for Handtufted and Handwoven rugs range from 6-8 weeks. Handknotted rugs range from 12-16 weeks. Please note that that quantity of rugs and # of colors can impact production lead times.',
                },
                {
                    id: 9,
                    question: 'What happens if I need to cancel an order?',
                    answer: 'Nomadory does not allow for cancellations after order placement.',
                },
            ],
        },
        {
            title: 'Quality & Construction',
            questions: [
                {
                    id: 11,
                    question:
                        'Do Nomadory rugs meet ADA compliance requirements?',
                    answer: 'Yes, we can manufacture rugs to meet ADA compliance requirements. We ensure the pile height of our handtufted rug does not exceed 10mm in height and when requested, can bevel edges down to a gradient of 8mm in height.',
                },
                {
                    id: 12,
                    question:
                        'Does Nomadory use fibers that are durable for indoor and outdoor use?',
                    answer: 'Yes, we recommend the use of high performance fibers such recycled polyester and Econyl (upcycled nylon) for outdoor rugs. We can recommend a variety of fibers for indoor rugs, ranging from wool, jute, silk, mohair and cashmere, including high performance options of recycled polyester and Econyl. Please reach out to our team to learn more about the best options for your project.',
                },
                {
                    id: 13,
                    question: 'Are all rugs treated for stain resistance?',
                    answer: 'Upon request we can apply a stain resistant coating to your rug. This coating is water based and non-toxic and is safe for adults, children and pets. The coating does not alter the look or feel or the rug application. Each application of coating can provide up to 18 months of protection.',
                },
                {
                    id: 14,
                    question: 'Are rug pads suggested for all types of rug?',
                    answer: 'Handtufted and Handknotted rugs do not require rug pads. We can provide an option to add a cotton canvas backing to rugs which are handwoven to prevent slippage and movement. Nomadory does not supply any rug pads.',
                },
                {
                    id: 15,
                    question: 'Are Nomadory rugs sustainable?',
                    answer: 'Nomadory has a set of sustainability commitments centered around transparency, human rights, responsible materials and craftmanship. To learn more about our sustainability pillars, please visit our website.',
                },
                {
                    id: 16,
                    question: 'How are the rugs made?',
                    answer: 'All of our rugs are handmade either on vertical or horizontal looms.',
                },
                {
                    id: 17,
                    question: 'Where are your rugs made?',
                    answer: 'All of our rugs are made in India and we can share more supplier details during the design and development phase.',
                },
                {
                    id: 18,
                    question: 'What warranties do you provide against defects?',
                    answer: 'Please refer to our Nomadory Conditions of Sales (insert link) to learn more about our warranty coverage.',
                },
                {
                    id: 19,
                    question: 'How do we clean and care for the rug?',
                    answer: 'We have an in-depth rug care guideline based on fiber and construction on our website.',
                },
            ],
        },
        {
            title: 'Delivery & Logistics',
            questions: [
                {
                    id: 21,
                    question:
                        'Does Nomadory provide custom packaging and label options for branding?',
                    answer: 'Based on the scale of a custom project we can provide custom exterior packaging options along with product labeling and tagging options',
                },
                {
                    id: 22,
                    question:
                        'Can we assign our own Freight Forwarder for FOB pick up overseas?',
                    answer: 'Unfortunately, At this time we cannot offer FOB pick up overseas. Our shipping terms are DDP (delivered duty paid) or FOB Port (any US port of arrival).',
                },
                {
                    id: 23,
                    question:
                        'What are the average shipping lead times for Air and Ocean?',
                    answer: 'Air shipments roughly take about 25 days from origin to destination. Ocean shipments roughly take about 55-60 days (45 days in the water with an additional 10-15 days to final destination)',
                },
                {
                    id: 24,
                    question: 'Do shipping costs include import duties?',
                    answer: 'Prepaid shipment includes import duties. If shipment is not prepaid at the time of order placement, we will invoice you for freight and duties based on actual costs once delivery is complete.',
                },
                {
                    id: 25,
                    question: 'Can you ship to any country outside of the US?',
                    answer: 'Currently, we only ship to warehousing/delivery locations in the US.',
                },
                {
                    id: 26,
                    question:
                        'Do you offer installation and other services related to the customization of a rug?',
                    answer: 'Upon request, we can provide a list of preferred rug service providers that can be contacted for installation and other services. For specifics around your requirements, please contact our team at sales@nomadory.com.',
                },
                {
                    id: 27,
                    question: 'Are you able to dropship rugs to our customers?',
                    answer: 'We currently offer bulk delivery of rugs to a single location indicated at the time of order placement. We cannot split a bulk order and ship individually to customers.',
                },
                {
                    id: 28,
                    question: 'Can Nomadory hold my rug for a later delivery?',
                    answer: 'Our standard practice is to immediately ship out rugs once completed. If you would like Nomadory to hold delivery until a specific delivery window, please contact our team at sales@nomadory.com.',
                },
            ],
        },
    ]
    return (
        <main className="nomadory-container">
            <h1 className="heading-1 mb-12">Frequently Asked Questions</h1>
            <FaqSection faqs={faqs} />
            <div className="h-20 md:h-40" />
            <h1 className="heading-1 mb-20">Didn&apos;t find your answer?</h1>
            <div className="max-w-[170px]">
                <Link href="/contacts" className="btn-brand-secondary">
                    Contact us <ArrowRoundedRight />
                </Link>
            </div>
            <div className="h-20 md:h-40" />
        </main>
    )
}

export default FrequentlyAskedQuestionsPage
