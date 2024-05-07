import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props {
  errorToggle?: boolean
  errorMessage?: string
  children?: React.ReactNode
  custom?: string
}

const Root: React.FC<Props> = ({
  children,
  custom,
  errorMessage,
  errorToggle = true,
}) => {
  return (
    <label
      className={classNames(
        twMerge(
          'w-full flex items-center justify-start relative p-2 px-4 gap-4 border border-[#9B9A9A] shadow-gray rounded-lg',
          custom,
        ),
        {
          'border-red-500': errorMessage,
          'border-[#9B9A9A]': errorMessage,
          'shadow-redStrong': errorMessage,
          'shadow-gray': errorMessage,
        },
      )}
    >
      <span className="absolute -top-2 px-2 font-medium text-xs text-red-500 bg-white">
        {errorToggle && errorMessage}
      </span>
      {children}
    </label>
  )
}

export default Root
