import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: { message?: string }
}

export const Input = forwardRef(
  (
    { label, name, type = 'text', error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="relative mt-3">
        <input
          id="floating_outlined"
          className="w-full flex-shrink border-[1px] px-3 focus:outline-none pb-2.5 pt-4 text-sm bg-transparent peer"
          placeholder=" "
          type={type}
          name={name}
          {...rest}
          ref={ref}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-primary-content"
        >
          {label}
        </label>
        {error && (
          <p className="text-red-500 text-xs text-start mt-1">
            {error.message}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
