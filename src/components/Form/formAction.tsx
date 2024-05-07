interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const Action: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      className="w-full h-10 text-sm font-bold rounded-lg text-white bg-[#44B678] shadow-greenSecondry"
      {...props}
    >
      {children}
    </button>
  )
}

export default Action
