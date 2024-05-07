import { forwardRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  custom?: string
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ custom, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          'w-full h-6 outline-none border-none text-sm placeholder:text-stone-500',
          custom,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
