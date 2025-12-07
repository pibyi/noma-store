const TrafficBars = ({ traffic = 'low' }) => {
    return (
        <svg
            width="120"
            height="129"
            viewBox="0 0 120 129"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="15.5"
                y="83.5"
                width="23"
                height="29"
                rx="0.5"
                stroke="#372926"
                fill={traffic === 'low' ? '#372926' : 'none'}
            />
            <rect
                x="48.5"
                y="53.5"
                width="23"
                height="59"
                rx="0.5"
                stroke="#372926"
                fill={traffic === 'medium' ? '#372926' : 'none'}
            />
            <rect
                x="81"
                y="16.5"
                width="24"
                height="97"
                rx="1"
                stroke="#372926"
                fill={traffic === 'high' ? '#372926' : 'none'}
            />
        </svg>
    )
}

export default TrafficBars
