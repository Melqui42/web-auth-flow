import { twMerge } from 'tailwind-merge'

import Icon from '../../utils/iconImport'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  toggle?: boolean
  custom?: string
}

const Action: React.FC<Props> = ({ toggle, custom, ...props }) => {
  return (
    <button type="button" className={twMerge('', custom)} {...props}>
      {!toggle ? (
        <Icon.Fi.FiEye className="text-stone-500" />
      ) : (
        <Icon.Fi.FiEyeOff className="text-stone-500" />
      )}
    </button>
  )
}

export default Action
