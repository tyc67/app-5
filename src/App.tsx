import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getGrid, getNodeClassName } from './lib/nodeProcessor'
import './App.css'

export interface Node {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isBlock: boolean
}

function App() {
  const rowLength = 30
  const colLength = 40
  const [nodes, setNodes] = useState<Node[][] | []>([])
  const [startNode, setStartNode] = useState<number[]>([0, 0])
  const [endNode, setEndNode] = useState<number[]>([rowLength - 1, colLength - 1])
  const [isRandomBlock, setIsRandomBlock] = useState<boolean>(true)

  useEffect(() => {
    setNodes(getGrid(rowLength, colLength, isRandomBlock, startNode, endNode))
  }, [])

  console.log(nodes)

  const handleMouseDown = (selectRow: number, selectCol: number) => {
    console.log(selectRow, selectCol)
    const updatedNodes = [...nodes]
    updatedNodes[selectRow][selectCol].isBlock = true
    setNodes(updatedNodes)
  }

  return (
    <>
      <div className="board">
        {nodes.map((row, idx) => (
          <div key={idx}>
            {row.map((node, idx) => {
              const extra = getNodeClassName(node)
              return (
                <div
                  key={idx}
                  id={`node-${node.row}-${node.col}`}
                  className={`node ${extra}`}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                ></div>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
