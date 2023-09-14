import { useState, useEffect } from 'react'
import { getGrid, getNodeClassName, type Node } from './lib/nodeProcessor'
import './App.css'
import DFS from './lib/dfs'
import BFS from './lib/bfs'
import { animateNodes, resetAnimate, type VisualizedNode } from './lib/animation'

function App() {
  const rowLength = 30
  const colLength = 40
  const isRandomBlock = true
  const [startIndex, setStartIndex] = useState<number[]>([0, 0])
  const [endIndex, setEndIndex] = useState<number[]>([rowLength - 1, colLength - 1])
  const initialNodes = getGrid(rowLength, colLength, isRandomBlock, startIndex, endIndex)
  const [nodes, setNodes] = useState<Node[][]>(initialNodes)
  const initialVisualizedNode = { visitedNodes: [], shortestPath: [] }
  const [visualizedNode, setVisualizedNode] = useState<VisualizedNode>(initialVisualizedNode)

  useEffect(() => {
    animateNodes(visualizedNode)
  }, [visualizedNode, visualizedNode.shortestPath, visualizedNode.visitedNodes])

  const handleMouseDown = (selectRow: number, selectCol: number) => {
    const updatedNodes = [...nodes]
    updatedNodes[selectRow][selectCol].isBlock = !updatedNodes[selectRow][selectCol].isBlock
    setNodes(updatedNodes)
  }

  const findPath = (method: string) => {
    const startNode = nodes[startIndex[0]][startIndex[1]]
    const endNode = nodes[endIndex[0]][endIndex[1]]
    let result: VisualizedNode
    switch (method) {
      case 'dfs':
        result = DFS(nodes, startNode, endNode)
        break
      case 'bfs':
        result = BFS(nodes, startNode, endNode)
        break
      default:
        result = initialVisualizedNode
    }
    setVisualizedNode(result)
  }

  const resetNode = () => {
    const newStartIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]
    const newEndIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]
    const newNodes = getGrid(rowLength, colLength, isRandomBlock, newStartIndex, newEndIndex)

    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
    setNodes(newNodes)
    resetAnimate(visualizedNode)
    setVisualizedNode(initialVisualizedNode)
    //TODO: need fix reset visualize bugs
  }

  console.log(nodes)
  console.log(visualizedNode)

  return (
    <>
      <button onClick={() => findPath('dfs')} type="button">
        DFS GO
      </button>
      <button onClick={() => findPath('bfs')} type="button">
        BFS GO
      </button>
      <button onClick={() => resetNode()} type="button">
        Reset
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
