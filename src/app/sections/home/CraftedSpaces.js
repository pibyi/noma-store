import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '../../components'
import projects from '../../constants/projects.json'

const CraftedSpaces = () => {
    const craftedSpace = [...projects]
        .sort((a, b) => a.order - b.order)
        .slice(0, 3)
        .map((project) => ({
            image: project.image.home,
            name: project.name,
            location: project.location,
            courtesy: project.courtesy,
            dimension: project.dimension.desktop,
        }))
    return (
        <div>
            <div className="flex items-end justify-between mb-4 md:mb-16">
                <div>
                    <h1 className="heading-1 mb-8 md:mb-16">Crafted Spaces</h1>
                    <h2 className="heading-2">From our hands to your home</h2>
                </div>
                <div className="hidden md:block">
                    <Button.Secondary
                        url="/project-gallery"
                        label="VIEW OUR WORK"
                    />
                </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-6 px-4 md:px-6 mb-10 md:mb-0">
                <div className="flex gap-4 md:gap-6">
                    {craftedSpace.map((project, index) => {
                        return (
                            <div
                                key={project.image}
                                className="flex-shrink-0 last-of-type:pr-4  md:last-of-type:pr-6"
                            >
                                <div
                                    className={clsx(
                                        'mb-4 md:mb-8 w-[300px] md:w-[540px] overflow-hidden',
                                        project.dimension[1] === 720
                                            ? 'h-[380px] md:h-[720px]'
                                            : 'h-[240px] md:h-[430px]'
                                    )}
                                >
                                    <Image
                                        height={project.dimension[1]}
                                        width={project.dimension[0]}
                                        src={project.image}
                                        alt={project.name}
                                        quality={100}
                                        priority={index === 0}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        className="w-full h-full border object-cover transition-transform duration-500 ease-out hover:scale-105"
                                    />
                                    {project.courtesy && (
                                        <div className="text-xs -translate-y-6 md:-translate-y-8 md:text-base translate-x-2 text-nomadory-secondary">
                                            {project.courtesy}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="title mb-2 md:mb-4">
                                        {project.name}
                                    </div>
                                    <div className="title text-nomadory-primary/50">
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="block md:hidden">
                <Button.Secondary
                    url="/project-gallery"
                    label="VIEW OUR WORK"
                />
            </div>
        </div>
    )
}

export { CraftedSpaces }
