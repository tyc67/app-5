import { useEffect, useState } from 'react'
import MethodButton from './MethodButton'
import Spinner from './Spinner'
import type { MatrixMode } from '../lib/nodeProcessor'
import type { MethodOption } from '../App'

interface MethodBarProps {
  matrixMode: MatrixMode
  isAnimating: boolean
  onClick: (method: MethodOption) => void
}

export default function MethodBar({ matrixMode, onClick, isAnimating }: MethodBarProps) {
  const methodsForBlockMode: MethodOption[] = ['DFS', 'BFS', 'Dijkstra']
  const methodsForDiverseMode: MethodOption[] = ['BFS', 'Dijkstra']
  const methods = matrixMode === 'block-mode' ? methodsForBlockMode : methodsForDiverseMode
  const [activeMethod, setActiveMethod] = useState<MethodOption | null>(null)

  useEffect(() => {
    if (!isAnimating) {
      setActiveMethod(null)
    }
  }, [isAnimating])

  const handleClick = (method: MethodOption) => {
    if (isAnimating) return
    setActiveMethod(method)
    onClick(method)
  }

  return (
    <div className="method-bar">
      {methods.map((method) => (
        <MethodButton key={method} onClick={() => handleClick(method)}>
          {method}
          {activeMethod === method ? <Spinner /> : null}
        </MethodButton>
      ))}
    </div>
  )
}
