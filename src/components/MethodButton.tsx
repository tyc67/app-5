import './Button.css'

interface MethodButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export default function MethodButton({ children, onClick }: MethodButtonProps) {
  return (
    <>
      <button onClick={onClick} type="button" className="method-button">
        {children}
      </button>
    </>
  )
}
