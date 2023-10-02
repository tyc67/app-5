import ModeButton from './ModeButton'
import type { MatrixMode } from '../lib/nodeProcessor'

interface ModeBarProps {
  matrixMode: MatrixMode
  onClick: (method: MatrixMode) => void
}

interface ModeOptions {
  mode: MatrixMode
  label: string
}

export default function ModeBar({ matrixMode, onClick }: ModeBarProps) {
  const modeOptions: ModeOptions[] = [
    { mode: 'block-mode', label: 'Mode 1' },
    { mode: 'diverse-mode', label: 'Mode 2' },
  ]

  return (
    <div className="mode-bar">
      {modeOptions.map((option, idx) => (
        <ModeButton key={idx} onClick={() => onClick(option.mode)} isCurrentMode={matrixMode === option.mode}>
          {option.label}
        </ModeButton>
      ))}
    </div>
  )
}
