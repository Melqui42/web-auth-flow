interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}

const Root: React.FC<Props> = ({ children, ...props }) => {
  return (
    <form className="w-96 flex flex-col items-center gap-4" {...props}>
      {children}
    </form>
  )
}

export default Root
