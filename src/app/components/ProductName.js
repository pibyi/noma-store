const ProductName = ({ name }) => {
    const parts = name.split(' ')
    const rest = parts.slice(1).join(' ')

    return (
        <h3 className="font-cormorant-garamond text-2xl uppercase">
            <span className="text-nomadory-primary">{parts[0]}</span>
            {rest && (
                <span className="text-nomadory-primary/50 ml-2">{rest}</span>
            )}
        </h3>
    )
}

export { ProductName }
