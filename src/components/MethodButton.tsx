import './Button.css'

export default function MethodButton({
  children,
  onClick,
}: React.PropsWithChildren<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}>) {
  return (
    <button onClick={onClick} type="button" className="method-button">
      {children}
    </button>
  )
}
 