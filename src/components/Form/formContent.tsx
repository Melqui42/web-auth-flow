import { twMerge } from 'tailwind-merge'

interface Props {
  children?: React.ReactNode
  custom?: string
}

const Content: React.FC<Props> = ({ children, custom }) => {
  return (
    <div className={twMerge('w-full flex flex-col gap-4', custom)}>
      {children}
    </div>
  )
}

export default Content
