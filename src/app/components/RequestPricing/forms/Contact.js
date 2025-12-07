'use client'
import { useForm, Controller } from 'react-hook-form'
import { Input, Select } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'
import { TextInput } from '../../TextInput'
import { countries, getEmojiFlag } from 'countries-list'

const ContactRequest = forwardRef((props, ref) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        getValues,
        clearErrors,
        setValue,
    } = useForm({
        defaultValues: {
            email: '',
            phoneCountry: 'us',
            phoneNumber: '',
            locationCountry: 'us',
            locationCity: '',
            collaboration: '',
        },
    })

    useImperativeHandle(ref, () => ({
        validateForm: async () => {
            const result = await trigger()
            if (result) {
                // Clear all errors when validation passes
                clearErrors()
            }
            return result
        },
        getFormData: () => getValues(),
        setFormData: (data) => {
            if (data.email !== undefined) setValue('email', data.email)
            if (data.phoneCountry !== undefined)
                setValue('phoneCountry', data.phoneCountry)
            if (data.phoneNumber !== undefined)
                setValue('phoneNumber', data.phoneNumber)
            if (data.locationCountry !== undefined)
                setValue('locationCountry', data.locationCountry)
            if (data.locationCity !== undefined)
                setValue('locationCity', data.locationCity)
            if (data.collaboration !== undefined)
                setValue('collaboration', data.collaboration)
        },
    }))

    const onSubmit = (data) => {}

    // Generate country options from countries-list package
    const countryOptions = Object.entries(countries)
        .map(([code, country]) => ({
            value: code.toLowerCase(),
            label: `${getEmojiFlag(code)} ${country.name}`,
            emoji: getEmojiFlag(code),
            name: country.name,
            code: country.phone,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-12"
        >
            <TextInput
                name="email"
                control={control}
                label="E-mail"
                placeholder="yourname@email.com"
                required={true}
                type="email"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                    },
                }}
                onChange={(e) => {
                    setTimeout(() => trigger('email'), 0)
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <label className="block text-base text-nomadory-primary mb-1.5">
                        Phone number
                    </label>
                    <div className="flex items-center">
                        <Controller
                            name="phoneCountry"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="nomadory-country-select w-16 translate-y-[4.3px]"
                                    size="large"
                                    options={countryOptions}
                                    getPopupContainer={() => document.body}
                                    optionLabelProp="emoji"
                                    labelInValue={false}
                                    suffixIcon={
                                        <svg
                                            width="14"
                                            height="9"
                                            viewBox="0 0 14 9"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 1L7 7L13 1"
                                                stroke="#221E1D"
                                                strokeOpacity="0.3"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    styles={{
                                        popup: {
                                            root: {
                                                minWidth: '300px',
                                            },
                                        },
                                        selector: {
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid #d1d5db',
                                            borderRadius: '0',
                                            boxShadow: 'none',
                                            paddingLeft: '0',
                                            paddingRight: '0',
                                        },
                                    }}
                                    optionRender={(option) => (
                                        <div className="flex items-center gap-2 !rounded-none">
                                            {/* <span className="text-sm font-poppins">
                                                (+{option.data.code})
                                            </span> */}
                                            <span className="text-lg">
                                                {option.data.emoji}
                                            </span>

                                            <span className="text-sm font-poppins">
                                                {option.data.name}
                                            </span>
                                        </div>
                                    )}
                                />
                            )}
                        />
                        <TextInput
                            name="phoneNumber"
                            control={control}
                            placeholder="+1 215 456-7890"
                            onChange={(e) => {
                                setTimeout(() => trigger('phoneNumber'), 0)
                            }}
                            className="flex-1"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <label className="block text-base text-nomadory-primary mb-1.5">
                        Location
                    </label>
                    <div className="flex items-center">
                        <Controller
                            name="locationCountry"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    className="nomadory-country-select w-16 translate-y-[4.3px]"
                                    size="large"
                                    options={countryOptions}
                                    getPopupContainer={() => document.body}
                                    optionLabelProp="emoji"
                                    labelInValue={false}
                                    suffixIcon={
                                        <svg
                                            width="14"
                                            height="9"
                                            viewBox="0 0 14 9"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1 1L7 7L13 1"
                                                stroke="#221E1D"
                                                strokeOpacity="0.3"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    }
                                    styles={{
                                        popup: {
                                            root: {
                                                minWidth: '300px',
                                            },
                                        },
                                        selector: {
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            borderBottom: '1px solid #d1d5db',
                                            borderRadius: '0',
                                            boxShadow: 'none',
                                            paddingLeft: '0',
                                            paddingRight: '0',
                                        },
                                    }}
                                    optionRender={(option) => (
                                        <div className="flex items-center gap-2 !rounded-none">
                                            <span className="text-sm font-poppins">
                                                (+{option.data.code})
                                            </span>
                                            <span className="text-lg">
                                                {option.data.emoji}
                                            </span>

                                            <span className="text-sm font-poppins">
                                                {option.data.name}
                                            </span>
                                        </div>
                                    )}
                                />
                            )}
                        />
                        <TextInput
                            name="locationCity"
                            control={control}
                            placeholder="Enter your address"
                            onChange={(e) => {
                                setTimeout(() => trigger('locationCity'), 0)
                            }}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Location */}
                {/* <div className="space-y-4">
                    <label className="block text-base text-nomadory-primary mb-1.5">
                        Location
                    </label>
                    <Controller
                        name="locationCity"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Select location"
                                className="w-full"
                                size="large"
                                options={countryOptions}
                                getPopupContainer={() => document.body}
                            />
                        )}
                    />
                </div> */}
            </div>

            {/* Collaboration Field */}
            <TextInput
                name="collaboration"
                control={control}
                label="How would you like to collaborate?"
                placeholder="Briefly describe your collaboration request"
                required={true}
                type="textarea"
                rows={4}
                onChange={(e) => {
                    setTimeout(() => trigger('collaboration'), 0)
                }}
                helperText='("Custom Rugs for a project", "White-label collection", "Sample-request", "Other-please specify")'
            />
        </form>
    )
})

ContactRequest.displayName = 'ContactRequest'

export { ContactRequest }
