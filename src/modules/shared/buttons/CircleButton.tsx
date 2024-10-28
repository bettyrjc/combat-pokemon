
const CircleButton = ({
  onClick,
  icon,
  isDisabled,
  isLoading,
  dataCy,
  isPrimary = true
}: {
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
  withBackground?: boolean
  dataCy?: string,
  isPrimary?: boolean
}) => {
  return (
    <button 
    data-cy={dataCy}
    className={`
      p-1  rounded-full shadow-xl transition-all duration-300
      ${isDisabled ? 'bg-gray-300 cursor-none' : 
        isPrimary ?'bg-primary cursor-pointer hover:bg-orange-600' : "bg-secondary hover:bg-teal-600"}
      `}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {icon}
    </button>
  )
}

export default CircleButton