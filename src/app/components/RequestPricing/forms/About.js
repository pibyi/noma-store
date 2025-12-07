'use client'
import { useForm, Controller } from 'react-hook-form'
import { ArrowRightIcon, CloseIcon } from '../../../icons'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { ProductSearchModal } from './ProductSearchModal'
import { TextInput } from '../../TextInput'
import { Modal } from 'antd'

const About = forwardRef(({ products, params = {} }, ref) => {
    const [aboutYouModalOpen, setAboutYouModalOpen] = useState(false)
    const [tempAboutYouValue, setTempAboutYouValue] = useState('')
    const [productModalOpen, setProductModalOpen] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
        trigger,
        clearErrors,
    } = useForm({
        defaultValues: {
            aboutYou: params.defaultClientType || '',
            firstName: '',
            lastName: '',
            companyName: '',
            products: [],
            hasOwnDesign: false,
        },
    })

    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const result = await trigger()
            if (result) {
                clearErrors()
            }
            return result
        },
        getFormData: () => getValues(),
        setFormData: (data) => {
            if (data.aboutYou !== undefined) setValue('aboutYou', data.aboutYou)
            if (data.firstName !== undefined)
                setValue('firstName', data.firstName)
            if (data.lastName !== undefined) setValue('lastName', data.lastName)
            if (data.companyName !== undefined)
                setValue('companyName', data.companyName)
            if (data.products !== undefined) setValue('products', data.products)
            if (data.hasOwnDesign !== undefined)
                setValue('hasOwnDesign', data.hasOwnDesign)
        },
    }))

    const hasOwnDesign = watch('hasOwnDesign')

    const onSubmit = (data) => {}

    const aboutYouOptions = [
        { value: 'private-client', label: "I'm a Private Client" },
        { value: 'trade-partner', label: "I'm a Trade Partner" },
        { value: 'brand', label: 'I Represent a Brand' },
    ]

    const handleAboutYouSelect = () => {
        setAboutYouModalOpen(true)
        setTempAboutYouValue(getValues('aboutYou'))
    }

    const handleAboutYouChange = (e) => {
        const value = e.target.value
        setTempAboutYouValue(value)
        setValue('aboutYou', value)
        // Trigger validation for this field to clear any errors
        trigger('aboutYou')
        setAboutYouModalOpen(false)
    }

    const handleAboutYouCancel = () => {
        setTempAboutYouValue('')
        setAboutYouModalOpen(false)
    }

    const getAboutYouDisplayText = (value) => {
        const option = aboutYouOptions.find((opt) => opt.value === value)
        return option ? option.label : 'Select who you represent'
    }

    const handleProductSelect = () => {
        setProductModalOpen(true)
    }

    const handleProductModalClose = () => {
        setProductModalOpen(false)
    }

    const handleProductToggle = (rugId, clear = false) => {
        if (!clear) {
            const currentProducts = getValues('products') || []
            const isSelected = currentProducts.includes(rugId)

            let newProducts
            if (isSelected) {
                newProducts = currentProducts.filter((id) => id !== rugId)
            } else {
                newProducts = [...currentProducts, rugId]
            }
            setValue('products', newProducts)
        } else {
            setValue('products', [])
        }

        trigger('products')
    }

    const handleRemoveProduct = (productId) => {
        const currentProducts = getValues('products') || []
        const newProducts = currentProducts.filter((id) => id !== productId)
        setValue('products', newProducts)
        trigger('products')
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-12 font-poppins"
            >
                <div className="space-y-4">
                    <label className="block text-base text-nomadory-primary mb-1.5">
                        About You*
                    </label>
                    <Controller
                        name="aboutYou"
                        control={control}
                        rules={{
                            required: 'Please select who you represent',
                        }}
                        render={({ field }) => (
                            <div
                                className="md:w-[calc(100%-2.25rem)] py-3.5 pl-4 border-b cursor-pointer flex justify-between items-center"
                                onClick={handleAboutYouSelect}
                            >
                                <span
                                    className={`text-sm ${field.value ? 'text-nomadory-primary' : 'text-gray-400'}`}
                                >
                                    {getAboutYouDisplayText(field.value)}
                                </span>
                                <ArrowRightIcon />
                            </div>
                        )}
                    />
                    {errors.aboutYou && (
                        <p className="text-nomadory-danger text-sm pl-4">
                            {errors.aboutYou.message}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        name="firstName"
                        control={control}
                        label="First name"
                        placeholder="Enter your name"
                        required={true}
                        rules={{
                            required: 'First name is required',
                            minLength: {
                                value: 2,
                                message:
                                    'First name must be at least 2 characters',
                            },
                        }}
                        onChange={(e) => {
                            setTimeout(() => trigger('firstName'), 0)
                        }}
                    />
                    <TextInput
                        name="lastName"
                        control={control}
                        label="Last name"
                        placeholder="Enter your last name"
                        required={true}
                        rules={{
                            required: 'Last name is required',
                            minLength: {
                                value: 2,
                                message:
                                    'Last name must be at least 2 characters',
                            },
                        }}
                        onChange={(e) => {
                            setTimeout(() => trigger('lastName'), 0)
                        }}
                    />
                </div>

                <TextInput
                    name="companyName"
                    control={control}
                    label="Company / Brand name"
                    placeholder="Enter your firm or brand name"
                    required={true}
                    rules={{
                        required: 'Company / Brand name is required',
                    }}
                    onChange={(e) => {
                        setTimeout(() => trigger('companyName'), 0)
                    }}
                />

                <div className="space-y-4">
                    <label className="block text-sm text-nomadory-primary">
                        Product *
                    </label>
                    <Controller
                        name="products"
                        control={control}
                        rules={{
                            required: hasOwnDesign
                                ? false
                                : 'Please select at least one rug',
                            validate: (value) => {
                                if (hasOwnDesign) return true
                                return (
                                    value.length > 0 ||
                                    'Please select at least one rug'
                                )
                            },
                        }}
                        render={({ field }) => (
                            <div
                                className={`w-full border-b border-nomadory-primary/30 py-2.5 pl-4 flex justify-between items-center focus:outline-none focus:border-nomadory-primary ${
                                    hasOwnDesign
                                        ? 'cursor-not-allowed opacity-50'
                                        : 'cursor-pointer'
                                }`}
                                onClick={
                                    hasOwnDesign
                                        ? undefined
                                        : handleProductSelect
                                }
                                onKeyDown={
                                    hasOwnDesign
                                        ? undefined
                                        : (e) => {
                                              if (
                                                  e.key === 'Enter' ||
                                                  e.key === ' '
                                              ) {
                                                  e.preventDefault()
                                                  handleProductSelect()
                                              }
                                          }
                                }
                                tabIndex={hasOwnDesign ? -1 : 0}
                            >
                                {field.value && field.value.length > 0 ? (
                                    <div className="flex items-center gap-6 flex-wrap">
                                        {products
                                            .filter((product) =>
                                                field.value.includes(product.id)
                                            )
                                            .map((product) => (
                                                <span
                                                    className=" tex-sm flex items-center gap-2 "
                                                    key={product.id}
                                                >
                                                    {product.title}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleRemoveProduct(
                                                                product.id
                                                            )
                                                        }}
                                                        disabled={hasOwnDesign}
                                                    >
                                                        <CloseIcon
                                                            size={16}
                                                            color="#221E1D4D"
                                                        />
                                                    </button>
                                                </span>
                                            ))}
                                    </div>
                                ) : (
                                    <span className="text-sm text-nomadory-primary/30">
                                        {hasOwnDesign
                                            ? 'Product selection skipped'
                                            : 'Select one or more rugs'}
                                    </span>
                                )}
                                {!hasOwnDesign && <ArrowRightIcon />}
                            </div>
                        )}
                    />
                    {errors.products && (
                        <p className="text-nomadory-danger text-sm pl-4">
                            {errors.products.message}
                        </p>
                    )}
                    {!hasOwnDesign && (
                        <p className=" text-sm italic text-nomadory-primary/50">
                            Please select at least one rug to send your quote
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-start">
                        <Controller
                            name="hasOwnDesign"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    id="hasOwnDesign"
                                    checked={field.value}
                                    onChange={(e) => {
                                        field.onChange(e.target.checked)
                                        if (e.target.checked) {
                                            // Clear products when checkbox is checked
                                            setValue('products', [])
                                            clearErrors('products')
                                        } else {
                                            // Trigger validation when unchecked
                                            trigger('products')
                                        }
                                    }}
                                    className="w-4 h-4 text-nomadory-primary bg-gray-100 border-gray-300 focus:ring-nomadory-primary focus:ring-2 mt-1"
                                    style={{
                                        accentColor: 'var(--nomadory-primary)',
                                    }}
                                />
                            )}
                        />
                        <div className="ml-3">
                            <label
                                htmlFor="hasOwnDesign"
                                className="text-sm font-poppins text-nomadory-primary cursor-pointer block"
                            >
                                I have my own design
                            </label>
                            <p className="text-xs text-nomadory-primary/50 mt-1">
                                Skip product selection and upload your own
                                design later.
                            </p>
                        </div>
                    </div>
                </div>

                <ProductSearchModal
                    open={productModalOpen}
                    onClose={handleProductModalClose}
                    selectedProducts={watch('products')}
                    onProductToggle={handleProductToggle}
                    products={products}
                />
            </form>
            <Modal
                open={aboutYouModalOpen}
                onCancel={() => setAboutYouModalOpen(false)}
                title={null}
                closeIcon={null}
                footer={null}
                className="nomadory-about-you-modal"
                centered={true}
            >
                <div className="p-4 relative">
                    <button
                        onClick={() => setAboutYouModalOpen(false)}
                        className="absolute top-4 right-4 cursor-pointer"
                    >
                        <CloseIcon size={20} />
                    </button>
                    <div className="space-y-4 mt-5">
                        {aboutYouOptions.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center"
                            >
                                <input
                                    type="radio"
                                    id={option.value}
                                    name="aboutYou"
                                    value={option.value}
                                    checked={tempAboutYouValue === option.value}
                                    onChange={handleAboutYouChange}
                                    className="w-4 h-4 text-nomadory-primary bg-gray-100 border-gray-300 focus:ring-nomadory-primary focus:ring-2"
                                    style={{
                                        accentColor: 'var(--nomadory-primary)',
                                    }}
                                />
                                <label
                                    htmlFor={option.value}
                                    className="text-2xl font-cormorant-garamond text-nomadory-primary ml-4 cursor-pointer"
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
})

About.displayName = 'About'

export { About }
