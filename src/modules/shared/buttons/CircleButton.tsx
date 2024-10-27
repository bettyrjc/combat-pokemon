
const CircleButton = ({
  onClick,
  icon,
  isDisabled,
  isLoading,
  dataCy
}: {
  onClick?: () => void
  icon?: React.ReactNode
  className?: string
  isDisabled?: boolean
  isLoading?: boolean
  withBackground?: boolean
  dataCy?: string
}) => {
  return (
    <button 
    data-cy={dataCy}
    className={`
      p-1  rounded-full shadow-xl transition-all duration-300
      ${isDisabled ? 'bg-gray-300 cursor-none' : 'bg-primary cursor-pointer hover:bg-orange-600'}
      `}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {icon}
    </button>
  )
}

export default CircleButton