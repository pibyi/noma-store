const PlusIcon = ({ size = 21 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.5 0V20" stroke="#221E1D" strokeLinecap="round" />
            <path d="M1 10L21 10" stroke="#221E1D" strokeLinecap="round" />
        </svg>
    )
}

export { PlusIcon }
