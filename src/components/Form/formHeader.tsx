interface HeaderProps {
  children?: React.ReactNode
}

const Root: React.FC<HeaderProps> = ({ children }) => {
  return <div className="flex flex-col text-center">{children}</div>
}

const Title: React.FC<HeaderProps> = ({ children }) => {
  return <h1 className="text-2xl font-extrabold text-[#2d2d2d]">{children}</h1>
}

const Description: React.FC<HeaderProps> = ({ children }) => {
  return <span className="text-[#6f6f6f]">{children}</span>
}

const Header = {
  Root,
  Title,
  Description,
}

export default Header
