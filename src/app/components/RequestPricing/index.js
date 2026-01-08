'use client'
import { Modal, Drawer } from 'antd'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRoundedLeft, ArrowRoundedRight, CloseIcon } from '../../icons'
import clsx from 'clsx'
import { About, ContactRequest, ProjectDetails } from './forms'
import axios from 'axios'

const RequestPricing = ({ params, label = 'Request a Quote', products }) => {
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 768 })
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    const showModal = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
            <button
                onClick={showModal}
                className="btn-brand-primary w-full md:max-w-[350px]"
            >
                {label}
            </button>
            {!isMobile ? (
                <Modal
                    open={open}
                    onCancel={handleClose}
                    footer={null}
                    width={1000}
                    centered
                    title={null}
                    closeIcon={null}
                    className="nomadory-request-pricing-modal"
                    maskClosable={false}
                >
                    <RequestPricingModal
                        onClose={handleClose}
                        products={products}
                        params={params}
                    />
                </Modal>
            ) : (
                <Drawer
                    open={open}
                    onClose={handleClose}
                    placement="bottom"
                    height="100%"
                    title={null}
                    footer={null}
                    closable={false}
                    className="nomadory-request-pricing-drawer"
                >
                    <RequestPricingModal
                        onClose={handleClose}
                        products={products}
                        params={params}
                    />
                </Drawer>
            )}
        </>
    )
}

export { RequestPricing }

const RequestPricingModal = ({ onClose, products, params = {} }) => {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const aboutFormRef = useRef(null)
    const contactFormRef = useRef(null)
    const projectFormRef = useRef(null)

    const formDataRef = useRef({
        about: {},
        contact: {},
        project: {},
    })

    const saveCurrentStepData = () => {
        const currentSection = sections.find((section) => section.isActive)
        if (currentSection?.formRef?.current?.getFormData) {
            const data = currentSection.formRef.current.getFormData()
            if (currentStep === 1) {
                formDataRef.current.about = data
            } else if (currentStep === 2) {
                formDataRef.current.contact = data
            } else if (currentStep === 3) {
                formDataRef.current.project = data
            }
        }
    }

    const restoreStepData = (stepNumber) => {
        let data = {}
        if (stepNumber === 1) {
            data = formDataRef.current.about
        } else if (stepNumber === 2) {
            data = formDataRef.current.contact
        } else if (stepNumber === 3) {
            data = formDataRef.current.project
        }

        setTimeout(() => {
            const targetRef =
                stepNumber === 1
                    ? aboutFormRef
                    : stepNumber === 2
                      ? contactFormRef
                      : projectFormRef

            if (
                targetRef.current?.setFormData &&
                Object.keys(data).length > 0
            ) {
                targetRef.current.setFormData(data)
            }
        }, 0)
    }

    const sections = [
        {
            id: 1,
            order: 1,
            label: 'Who You Are',
            form: (
                <About products={products} params={params} ref={aboutFormRef} />
            ),
            isActive: currentStep === 1,
            formRef: aboutFormRef,
        },
        {
            id: 2,
            order: 2,
            label: 'Contact & Request',
            form: <ContactRequest ref={contactFormRef} />,
            isActive: currentStep === 2,
            formRef: contactFormRef,
        },
        {
            id: 3,
            order: 3,
            label: 'Project Details',
            form: <ProjectDetails ref={projectFormRef} />,
            isActive: currentStep === 3,
            formRef: projectFormRef,
        },
    ]

    const handlePrevious = () => {
        if (currentStep > 1) {
            saveCurrentStepData()
            const nextStep = currentStep - 1
            setCurrentStep(nextStep)
            restoreStepData(nextStep)
        }
    }

    const handleNext = async () => {
        const currentSection = sections.find((section) => section.isActive)

        if (currentSection?.formRef?.current?.validateForm) {
            const isValid = await currentSection.formRef.current.validateForm()
            if (!isValid) {
                return
            }
        }

        if (currentStep < sections.length) {
            saveCurrentStepData()
            const nextStep = currentStep + 1
            setCurrentStep(nextStep)
            restoreStepData(nextStep)
        }
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            saveCurrentStepData()
            const currentSection = sections.find((section) => section.isActive)
            if (currentSection?.formRef?.current?.validateForm) {
                const currentValid =
                    await currentSection.formRef.current.validateForm()
                if (!currentValid) {
                    alert('Please fill in all required fields on this step.')
                    setIsSubmitting(false)
                    return
                }
            }
            const aboutData = {
                ...formDataRef.current.about,
                ...(aboutFormRef.current?.getFormData() || {}),
            }
            const contactData = {
                ...formDataRef.current.contact,
                ...(contactFormRef.current?.getFormData() || {}),
            }
            const projectData = {
                ...formDataRef.current.project,
                ...(projectFormRef.current?.getFormData() || {}),
            }
            const missingFields = []
            if (!aboutData.aboutYou) missingFields.push('Client type')
            if (!aboutData.firstName) missingFields.push('First name')
            if (!aboutData.lastName) missingFields.push('Last name')
            if (!aboutData.companyName) missingFields.push('Company name')
            if (
                !aboutData.hasOwnDesign &&
                (!aboutData.products || aboutData.products.length === 0)
            )
                missingFields.push('Product selection')
            if (!contactData.email) missingFields.push('Email')
            if (!contactData.collaboration)
                missingFields.push('Collaboration description')
            if (!projectData.projectVision) missingFields.push('Project vision')

            if (missingFields.length > 0) {
                alert(
                    `Please complete the following required fields: ${missingFields.join(', ')}`
                )
                setIsSubmitting(false)
                return
            }
            const sanitizedProjectData = {
                ...projectData,
                estimateTimeline: projectData.estimateTimeline
                    ? projectData.estimateTimeline.toISOString().split('T')[0]
                    : null,
            }

            const allFormData = {
                ...aboutData,
                ...contactData,
                ...sanitizedProjectData,
                submissionDate: new Date().toISOString(),
            }
            // Create FormData for file uploads
            const formDataToSend = new FormData()

            // Add all form fields
            Object.keys(allFormData).forEach((key) => {
                if (key === 'files' && allFormData[key]) {
                    // Handle files separately
                    allFormData[key].forEach((file) => {
                        formDataToSend.append(
                            'files',
                            file.originFileObj || file
                        )
                    })
                } else if (Array.isArray(allFormData[key])) {
                    // Handle arrays
                    allFormData[key].forEach((item) => {
                        formDataToSend.append(`${key}[]`, item)
                    })
                } else {
                    // Handle regular fields
                    formDataToSend.append(key, allFormData[key])
                }
            })

            const response = await axios.post(
                '/api/request-pricing',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            const result = response.data

            if (result.success) {
                onClose()
                router.push('/thank-you')
            } else {
                console.error('Failed to submit to Airtable:', result.error)
                alert(
                    result.error ||
                        'There was an error submitting your request. Please try again.'
                )
            }
        } catch (error) {
            console.error('Error during form submission:', error)
            alert(
                'There was an error submitting your request. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    const isFirstStep = currentStep === 1
    const isLastStep = currentStep === sections.length
    return (
        <div className="relative h-full flex flex-col">
            <button
                onClick={onClose}
                className="absolute cursor-pointer right-0 top-0 z-10"
            >
                <CloseIcon size={26} color="#221E1D" />
            </button>
            <div className="flex flex-col md:flex-row gap-10 md:gap-[72px] h-full flex-1 min-h-0">
                <div className="md:max-w-[270px] flex-shrink-0">
                    <h1 className="heading-1 md:mb-12 mb-6 max-w-[194px] md:max-w-[270px]">
                        Request Pricing
                    </h1>
                    <div className="body-default font-poppins">
                        We&apos;d love to collaborate with you and curate a
                        selection of samples tailored to your vision. To begin,
                        share a few details about your project below and
                        we&apos;ll be in touch to schedule a personalized
                        consultation.
                    </div>
                </div>
                <div className="w-full relative flex flex-col flex-1 min-h-0">
                    <div className="hidden md:flex w-full justify-between mt-[72px] border-b border-nomadory-primary/30 h-auto flex-shrink-0">
                        {sections.map((section) => {
                            return (
                                <div key={section.id}>
                                    <h2
                                        className={clsx(
                                            'text-lg text-nomadory-primary/30 mb-4 cursor-pointer transition-colors',
                                            {
                                                '!text-nomadory-primary':
                                                    section.isActive,
                                                'hover:text-nomadory-primary/50':
                                                    !section.isActive &&
                                                    section.order < currentStep,
                                            }
                                        )}
                                        onClick={() => {
                                            if (section.order < currentStep) {
                                                saveCurrentStepData()
                                                setCurrentStep(section.order)
                                                restoreStepData(section.order)
                                            }
                                        }}
                                    >
                                        <span>{section.order}/3</span>&nbsp;
                                        <span>{section.label}</span>
                                    </h2>
                                    <div
                                        className={clsx(
                                            'translate-y-0.25 h-0.25 w-full',
                                            {
                                                '!bg-nomadory-primary':
                                                    section.isActive,
                                            }
                                        )}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex items-center justify-between md:hidden">
                        {sections.map((section, index) => {
                            return (
                                <Fragment key={section.id}>
                                    <div>
                                        <h2
                                            className={clsx(
                                                'h-10 w-10 font-poppins flex items-center justify-center rounded-full text-lg border border-nomadory-primary/30 text-nomadory-primary/30 transition-all',
                                                {
                                                    '!bg-nomadory-primary !text-white !border-nomadory-primary':
                                                        section.isActive,
                                                    'cursor-pointer hover:border-nomadory-primary/50':
                                                        !section.isActive &&
                                                        section.order <
                                                            currentStep,
                                                }
                                            )}
                                            onClick={() => {
                                                if (
                                                    section.order < currentStep
                                                ) {
                                                    saveCurrentStepData()
                                                    setCurrentStep(
                                                        section.order
                                                    )
                                                    restoreStepData(
                                                        section.order
                                                    )
                                                }
                                            }}
                                        >
                                            {section.order}
                                        </h2>
                                    </div>
                                    {sections.length - 1 !== index && (
                                        <div
                                            className={clsx(
                                                'h-0.25 mx-0.75 w-full',
                                                {
                                                    'bg-nomadory-primary':
                                                        sections[index + 1]
                                                            ?.isActive,
                                                    'bg-nomadory-primary/30':
                                                        !sections[index + 1]
                                                            ?.isActive,
                                                }
                                            )}
                                        />
                                    )}
                                </Fragment>
                            )
                        })}
                    </div>
                    <div className="md:py-16 py-12 flex-1 md:min-h-0 md:overflow-y-auto">
                        {sections.find((section) => section.isActive)?.form}
                    </div>
                    <div className="flex items-center justify-between w-full flex-shrink-0 mt-6  pb-6">
                        <button
                            onClick={handlePrevious}
                            disabled={isFirstStep}
                            className="btn-brand-secondary"
                        >
                            <ArrowRoundedLeft />
                            {currentStep === 2 && 'Preview'}
                        </button>
                        <button
                            onClick={isLastStep ? handleSubmit : handleNext}
                            disabled={isSubmitting}
                            className="btn-brand-secondary"
                        >
                            {isLastStep
                                ? isSubmitting
                                    ? 'Sending...'
                                    : 'Send Request'
                                : 'Continue'}{' '}
                            {!isSubmitting && <ArrowRoundedRight />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
