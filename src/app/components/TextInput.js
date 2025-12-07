'use client'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'

const TextInput = ({
    name,
    control,
    label,
    placeholder,
    rules,
    required = false,
    className = '',
    type = 'text',
    rows = null,
    helperText,
    onChange,
    ...props
}) => {
    const InputComponent = rows ? 'textarea' : 'input'

    return (
        <div className={clsx('space-y-1.5 font-poppins', className)}>
            <label className="block text-base">
                {label}
                {required && <span>&nbsp;*</span>}
            </label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <InputComponent
                            {...field}
                            {...props}
                            type={type}
                            rows={rows}
                            placeholder={placeholder}
                            className={clsx(
                                'w-full px-4 py-3.5 border-b border-nomadory-primary/30 focus:outline-none focus:border-nomadory-primary text-sm transition-colors duration-300 ease-in-out',
                                {
                                    'border-nomadory-danger': error,
                                }
                            )}
                            onChange={(e) => {
                                field.onChange(e)
                                if (onChange) {
                                    onChange(e)
                                }
                            }}
                        />
                        <div className="overflow-hidden">
                            <p
                                className={clsx(
                                    'text-nomadory-danger text-sm pl-4 transition-all duration-300 ease-in-out transform',
                                    {
                                        'opacity-100 translate-y-0 max-h-6':
                                            error,
                                        'opacity-0 -translate-y-2 max-h-0':
                                            !error,
                                    }
                                )}
                            >
                                {error?.message}
                            </p>
                        </div>
                        {helperText && !error && (
                            <p className="text-sm text-nomadory-primary/50 italic">
                                {helperText}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    )
}

export { TextInput }
