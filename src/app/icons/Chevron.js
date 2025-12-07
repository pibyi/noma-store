const Left = ({ disabled = false }) => {
    return (
        <svg
            width="18"
            height="26"
            viewBox="0 0 18 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17 25L1 13.0002L17 1"
                stroke="#221E1D"
                strokeOpacity={disabled ? '0.5' : '1'}
            />
        </svg>
    )
}
const Right = ({ disabled = false }) => {
    return (
        <svg
            width="18"
            height="26"
            viewBox="0 0 18 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1L17 12.9998L1 25"
                stroke="#221E1D"
                strokeOpacity={disabled ? '0.5' : '1'}
            />
        </svg>
    )
}

export { Left, Right }
