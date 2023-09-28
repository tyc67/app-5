import './Button.css'

export default function ModeButton({
  children,
  onClick,
  isCurrentMode,
}: React.PropsWithChildren<{
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isCurrentMode: boolean
}>) {
  return (
    <button onClick={onClick} type="button" className={isCurrentMode ? 'currentmode' : 'mode-button'}>
      {children}
    </button>
  )
}
