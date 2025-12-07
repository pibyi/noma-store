import Image from 'next/image'
import Link from 'next/link'

const ExploreOpportunities = () => {
    return (
        <div className="flex flex-col md:flex-row items-start justify-between">
            <h1 className="heading-1 mb-8 w-full md:w-[31.5%]">
                Together We Create
            </h1>
            <div className="max-w-[800px] w-full  md:w-[57.5%]">
                <Link
                    href="/collaborate"
                    className="hidden md:block btn-brand-primary max-w-[358px] mb-20"
                >
                    Explore Opportunities
                </Link>
                <div className="text-2xl leading-9  md:text-justify font-normal max-w-[470px] text-[#372926]  mb-6 md:mb-12 tracking-[0.08em]">
                    Whether you&apos;re a trade professional or a brand
                    visionary – let&apos;s collaborate
                </div>
                <div className="w-full mb-6">
                    <Image
                        src="/images/process-loom-threading.png"
                        alt="process-loom-threading"
                        width={800}
                        height={900}
                    />
                </div>
                <Link
                    href="/collaborate"
                    className="block md:hidden btn-default w-full"
                >
                    Explore Opportunities
                </Link>
            </div>
        </div>
    )
}
export { ExploreOpportunities }
