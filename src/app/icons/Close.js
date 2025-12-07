const CloseIcon = ({ color = 'black', size = 26 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1L27 27M27 1L1 27"
                stroke={color}
                strokeLinecap="round"
            />
        </svg>
    )
}

export { CloseIcon }
