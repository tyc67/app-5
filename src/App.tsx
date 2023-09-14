import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getGrid, getNodeClassName, type Node } from './lib/nodeProcessor'
import './App.css'
import DFS from './lib/dfs'

function App() {
  const rowLength = 30
  const colLength = 40
  const [nodes, setNodes] = useState<Node[][] | []>([])
  const [startIndex, setStartIndex] = useState<number[]>([0, 0])
  const [endIndex, setEndIndex] = useState<number[]>([rowLength - 1, colLength - 1])
  const [isRandomBlock, setIsRandomBlock] = useState<boolean>(true)

  useEffect(() => {
    setNodes(getGrid(rowLength, colLength, isRandomBlock, startIndex, endIndex))
  }, [])

  console.log(nodes)

  const handleMouseDown = (selectRow: number, selectCol: number) => {
    // console.log(selectRow, selectCol)
    const updatedNodes = [...nodes]
    updatedNodes[selectRow][selectCol].isBlock = true
    setNodes(updatedNodes)
  }

  const visualizedPath = () => {
    const startNode = nodes[startIndex[0]][startIndex[1]]
    const endNode = nodes[endIndex[0]][endIndex[1]]
    const visitedNodes = DFS(nodes, startNode, endNode)

    visitedNodes.forEach((node, i) => {
      if (node.isStart || node.isEnd) {
        return
      }
      setTimeout(() => {
        const element = document.getElementById(`node-${node.row}-${node.col}`)
        if (element) {
          element.classList.add('visited')
        }
      }, 20 * i)
    })
  }

  return (
    <>
      <button onClick={() => visualizedPath()} type="button">
        DFS GO
      </button>
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
