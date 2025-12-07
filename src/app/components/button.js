import Link from 'next/link'
import { ArrowRoundedRight } from '../icons'

const Secondary = ({ label, url }) => {
    return (
        <Link
            href={url}
            className="flex items-center gap-3 cursor-pointer group"
        >
            <span className="text-lg uppercase">{label}</span>
            <div className="transition-all ease-in-out group-hover:scale-125">
                <ArrowRoundedRight />
            </div>
        </Link>
    )
}

export { Secondary }
