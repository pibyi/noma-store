import Image from 'next/image'

const MeetTheDesigner = ({ designer }) => {
    if (!designer) {
        return null
    }

    return (
        <div className="nomadory-container max-w-[1000px] mx-auto space-y-12">
            <div>
                <h2 className="font-semibold text-3.5xl text-nomadory-primary/80 font-cormorant-garamond mb-8 md:mb-12 text-center">
                    Meet the Designer:{' '}
                    <span className="text-nomadory-primary">
                        {designer.title}
                    </span>
                </h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                    <div className="w-full max-w-[320px] md:max-w-none md:w-[40%] flex-shrink-0">
                        {designer.avatar?.url ? (
                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                <Image
                                    src={designer.avatar.url}
                                    alt={
                                        designer.avatar.altText ||
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
            <div className="mt-12 md:mt-24 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    {(() => {
                        const projects = designer.projects || []
                        const verticalImage = projects.find(
                            (p) => p.height > p.width
                        )
                        const horizontalImage = projects.find(
                            (p) => p.width > p.height
                        )

                        const imagesToShow = []
                        if (verticalImage && horizontalImage) {
                            imagesToShow.push(verticalImage, horizontalImage)
                        } else {
                            imagesToShow.push(...projects.slice(0, 2))
                        }

                        return imagesToShow.map((project, index) => {
                            const isVertical = project.height > project.width
                            const aspectRatio = isVertical ? 2 / 3 : 3 / 2

                            return (
                                <div
                                    key={project.url}
                                    className="relative h-auto w-full md:w-auto hover:scale-110 transition-transform duration-300"
                                    style={{
                                        flex: aspectRatio,
                                        aspectRatio: `${aspectRatio}`,
                                    }}
                                >
                                    <Image
                                        src={project.url}
                                        alt={
                                            project.altText ||
                                            `${designer.name} project ${
                                                index + 1
                                            }`
                                        }
                                        fill
                                        className="object-cover"
                                        quality={100}
                                    />
                                </div>
                            )
                        })
                    })()}
                </div>
            </div>
        </div>
    )
}

export { MeetTheDesigner }
