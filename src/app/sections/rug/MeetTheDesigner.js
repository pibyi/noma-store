import Image from 'next/image'

const MeetTheDesigner = ({ designer }) => {
    if (!designer) {
        return null
    }

    return (
        <div className="nomadory-container max-w-[1000px] mx-auto">
            <div>
                <h2 className="font-semibold text-3.5xl text-nomadory-primary/80 font-cormorant-garamond mb-8 md:mb-12 text-center">
                    Meet the Designer:{' '}
                    <span className="text-nomadory-primary">
                        {designer.title}
                    </span>
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                    <div className="w-full max-w-[320px] md:max-w-none md:w-[40%] flex-shrink-0">
                        {designer.image?.url ? (
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <Image
                                    src={designer.image.url}
                                    alt={
                                        designer.image.altText ||
                                        `${designer.title}`
                                    }
                                    fill
                                    className="object-cover"
                                    quality={100}
                                />
                            </div>
                        ) : (
                            <div className="relative w-full aspect-[3/4] bg-nomadory-primary/5" />
                        )}
                    </div>

                    <div className="w-full md:w-[60%] flex flex-col justify-center">
                        {designer.descriptionHtml && (
                            <div
                                className="text-nomadory-primary/80 text-justify leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: designer.descriptionHtml,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MeetTheDesigner }
