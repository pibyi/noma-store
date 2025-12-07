const SearchIcon = ({ size = 33 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 33 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12.5" cy="12.5" r="12" stroke="#221E1D" />
            <line
                x1="20.7071"
                y1="22"
                x2="32"
                y2="33.2929"
                stroke="#221E1D"
                strokeLinecap="round"
            />
        </svg>
    )
}
export { SearchIcon }
