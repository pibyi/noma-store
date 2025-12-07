import clsx from 'clsx'

const RugsImage = ({ product }) => {
    return (
        <div className="md:space-y-12 w-full">
            {product.images.map((url, index) => (
                <div
                    className={clsx(
                        'p-12 md:p-24 w-full bg-white',
                        index === 0 ? 'block' : 'hidden md:block'
                    )}
                    key={url}
                >
                    <img
                        width={350}
                        height={500}
                        src={url}
                        alt={product.title}
                        className="w-full h-full object-cover p-1"
                    />
                </div>
            ))}
        </div>
    )
}

export { RugsImage }
