import classNames from 'classnames'

import Icon from '../../utils/iconImport'

interface Props {
  type: boolean
  toggle: boolean
  message: string
}

const Alert: React.FC<Props> = ({ type, toggle, message }) => {
  return (
    <div
      className={classNames(
        'flex items-start fixed top-4 gap-2 p-4 rounded-md transition-all duration-500',
        {
          'bg-red-500': !type,
          'bg-[#44B678]': type,
          'shadow-redLight': !type,
          'shadow-greenPrimary': type,
          '-right-[600px]': !toggle,
          '-right-[-30px]': toggle,
        },
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center p-3 rounded-full bg-white">
          {type ? (
            <Icon.Fa.FaCheck
              className={classNames('', {
                'text-red-500': !type,
                'text-[#44B678]': type,
              })}
            />
          ) : (
            <Icon.Go.GoAlertFill
              className={classNames('', {
                'text-red-500': !type,
                'text-[#44B678]': type,
              })}
            />
          )}
        </div>
        <div className="w-72">
          <h1 className="text-lg font-bold text-white">
            {type ? 'Sucesso!' : 'Error!'}
          </h1>
          <p className="w-full text-md text-white">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
