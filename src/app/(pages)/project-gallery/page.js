import Image from 'next/image'
import clsx from 'clsx'
import projects from '../../constants/projects.json'

const ProjectGalleryPage = () => {
    const column1Projects = projects
        .filter((project) => project.column === 1)
        .sort((a, b) => a.order - b.order)
    const column2Projects = projects
        .filter((project) => project.column === 2)
        .sort((a, b) => a.order - b.order)

    const sortedProjects = [...projects].sort((a, b) => a.order - b.order)
    return (
        <main className="nomadory-container">
            <h1 className="heading-1 mb-8 md:mb-16">Crafted Spaces</h1>
            <div className="flex flex-col md:flex-row md:gap-[66px] gap-6">
                <p className="heading-2 text-left max-w-[249px] ml-auto md:max-w-[222px]">
                    A curated showcase of bespoke rugs, crafted in collaboration
                    with designers to suit every space.
                </p>
                <div className="space-y-6 md:hidden">
                    {sortedProjects.map((project, index) => (
                        <div key={project.id}>
                            <div className="mb-4 overflow-hidden">
                                <Image
                                    src={project.image.gallery}
                                    alt={project.name}
                                    width={project.dimension.phone[0]}
                                    height={project.dimension.phone[1]}
                                    quality={100}
                                    priority={index === 0}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                                />
                                {project.courtesy && (
                                    <div className="text-xs -translate-y-6 translate-x-2 text-nomadory-secondary">
                                        {project.courtesy}
                                    </div>
                                )}
                            </div>
                            <div className="title mb-2">{project.name}</div>
                            <div className="title text-nomadory-primary/50">
                                {project.location}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hidden md:flex md:flex-row  gap-6">
                    <div className="space-y-12">
                        {column1Projects.map((project, index) => (
                            <div key={project.id}>
                                <div
                                    className={clsx(
                                        'mb-8 overflow-hidden',
                                        project.dimension.desktop[1] === 720
                                            ? 'h-[720px] w-auto'
                                            : project.dimension.desktop[1] ===
                                                430
                                              ? 'h-[430px] w-auto'
                                              : ''
                                    )}
                                >
                                    <Image
                                        src={project.image.gallery}
                                        alt={project.name}
                                        width={project.dimension.desktop[0]}
                                        height={project.dimension.desktop[1]}
                                        quality={100}
                                        priority={index === 0}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        className={clsx(
                                            'object-cover transition-transform duration-500 ease-out hover:scale-105',
                                            (project.dimension.desktop[1] ===
                                                430 ||
                                                project.dimension.desktop[1] ===
                                                    720) &&
                                                'h-full'
                                        )}
                                    />
                                    {project.courtesy && (
                                        <div className="-translate-y-8 translate-x-2 text-nomadory-secondary">
                                            {project.courtesy}
                                        </div>
                                    )}
                                </div>
                                <div className="title mb-4">{project.name}</div>
                                <div className="title text-nomadory-primary/50">
                                    {project.location}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-12">
                        {column2Projects.map((project, index) => (
                            <div key={project.id}>
                                <div
                                    className={clsx(
                                        'mb-8 overflow-hidden',
                                        project.dimension.desktop[1] === 720
                                            ? 'h-[720px] w-auto'
                                            : project.dimension.desktop[1] ===
                                                430
                                              ? 'h-[430px] w-auto'
                                              : ''
                                    )}
                                >
                                    <Image
                                        src={project.image.gallery}
                                        alt={project.name}
                                        width={project.dimension.desktop[0]}
                                        height={project.dimension.desktop[1]}
                                        quality={100}
                                        priority={index === 0}
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                        className={clsx(
                                            'object-cover transition-transform duration-500 ease-out hover:scale-105',
                                            (project.dimension.desktop[1] ===
                                                430 ||
                                                project.dimension.desktop[1] ===
                                                    720) &&
                                                'h-full'
                                        )}
                                    />
                                    {project.courtesy && (
                                        <div className="-translate-y-8 translate-x-2 text-nomadory-secondary">
                                            {project.courtesy}
                                        </div>
                                    )}
                                </div>
                                <div className="title mb-4">{project.name}</div>
                                <div className="title text-nomadory-primary/50">
                                    {project.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-20 md:h-40"></div>
        </main>
    )
}
export default ProjectGalleryPage
