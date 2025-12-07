import { Modal } from 'antd'
import { CloseIcon } from '../icons'

const NotificationModal = ({ type, visible, onCancel, message }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            title={null}
            closeIcon={null}
            footer={null}
            className="nomadory-about-you-modal"
            centered={true}
        >
            <div className="p-12 relative">
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 cursor-pointer"
                >
                    <CloseIcon size={20} />
                </button>
                <div className="flex flex-col gap-8 items-center justify-center">
                    {type === 'success' && (
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0.5"
                                y="0.5"
                                width="29"
                                height="29"
                                rx="14.5"
                                stroke="#221E1D"
                            />
                            <path
                                d="M20.7139 10.5576C20.8306 10.4409 21.0102 10.4409 21.127 10.5576C21.2432 10.6742 21.2432 10.8531 21.127 10.9697L12.6465 19.4424C12.5298 19.559 12.3423 19.559 12.2256 19.4424L8.87402 16.0898C8.75731 15.9731 8.75734 15.7945 8.87402 15.6777C8.99076 15.561 9.1694 15.561 9.28613 15.6777L12.0869 18.4775L12.4404 18.8311L20.7139 10.5576Z"
                                stroke="#221E1D"
                            />
                        </svg>
                    )}
                    <div className="heading-2 text-center font-cormorant-garamond">
                        <div>{message}</div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export { NotificationModal }
