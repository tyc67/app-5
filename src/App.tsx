import { useState, useEffect } from 'react'
import { getGrid, getNodeClassName, getNodeColor, type Node } from './lib/nodeProcessor'
import './App.css'
import DFS from './lib/dfs'
import BFS from './lib/bfs'
import Dijkstra from './lib/Dijkstra'

interface VisualizedNode {
  visitedNodes: Node[]
  shortestPath: Node[]
}

function App() {
  const rowLength = 30
  const colLength = 40
  const [startIndex, setStartIndex] = useState<number[]>([0, 0])
  const [endIndex, setEndIndex] = useState<number[]>([rowLength - 1, colLength - 1])
  const initialNodes = getGrid(rowLength, colLength, 'randomBlock', startIndex, endIndex)
  const [nodes, setNodes] = useState<Node[][]>(initialNodes)
  const initialVisualizedNode = { visitedNodes: [], shortestPath: [] }
  const [visualizedNode, setVisualizedNode] = useState<VisualizedNode>(initialVisualizedNode)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    if (!isAnimating) return
    let visitedNodesInterval: NodeJS.Timeout
    let shortestPathInterval: NodeJS.Timeout
    const [shortestPath, visitedNodes] = [[...visualizedNode.shortestPath], [...visualizedNode.visitedNodes]]
    const animateVisitedNodes = () => {
      let idx = 0
      visitedNodesInterval = setInterval(() => {
        if (idx < visitedNodes.length) {
          const node = visitedNodes[idx]
          const updatedNodes = [...nodes]
          if (!updatedNodes[node.row][node.col].isStart && !updatedNodes[node.row][node.col].isEnd) {
            updatedNodes[node.row][node.col].isVisualized = true
          }
          setNodes(updatedNodes)
          idx++
          if (idx === visitedNodes.length) {
            clearInterval(visitedNodesInterval)
            animateShortestPath()
          }
        }
      }, 16)
    }
    const animateShortestPath = () => {
      let idx = 0
      shortestPathInterval = setInterval(() => {
        if (idx < shortestPath.length) {
          const node = shortestPath[idx]
          const updatedNodes = [...nodes]
          updatedNodes[node.row][node.col].isPath = true
          setNodes(updatedNodes)
          idx++
          if (idx === shortestPath.length) {
            clearInterval(shortestPathInterval)
            setIsAnimating(false)
          }
        } else {
          clearInterval(shortestPathInterval)
          setIsAnimating(false)
        }
      }, 16)
    }
    animateVisitedNodes()

    return () => {
      clearInterval(visitedNodesInterval)
      clearInterval(shortestPathInterval)
      setIsAnimating(false)
    }
  }, [isAnimating])

  const handleMouseDown = (selectRow: number, selectCol: number) => {
    const updatedNodes = [...nodes]
    if (updatedNodes[selectRow][selectCol].opaque === 1) {
      updatedNodes[selectRow][selectCol].opaque = 0
    } else if (updatedNodes[selectRow][selectCol].opaque === 0) {
      updatedNodes[selectRow][selectCol].opaque = 1
    }
    setNodes(updatedNodes)
  }

  const findPath = (method: string) => {
    if (isAnimating) return
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
      case 'dijkstra':
        result = Dijkstra(nodes, startNode, endNode)
        break
      default:
        result = initialVisualizedNode
    }
    resetVisualizedNode(nodes)
    setVisualizedNode(result)
    setIsAnimating(true)
  }

  const resetVisualizedNode = (nodes: Node[][]) => {
    const updatedNodes = [...nodes]
    updatedNodes.forEach((row) => {
      row.forEach((node) => {
        node.isVisited = false
        node.isVisualized = false
        node.isPath = false
      })
    })

    setNodes(updatedNodes)
    setVisualizedNode(initialVisualizedNode)
  }

  const generateNewNodes = (mode: string) => {
    if (isAnimating) return
    const newStartIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]
    const newEndIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]

    let newNodes: Node[][]

    if (mode === 'randomBlock' || mode === 'd-mode') {
      newNodes = getGrid(rowLength, colLength, mode, newStartIndex, newEndIndex)
    } else {
      newNodes = nodes
    }

    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
    setNodes(newNodes)
    setVisualizedNode(initialVisualizedNode)
  }

  return (
    <>
      <button onClick={() => findPath('dfs')} type="button">
        DFS GO
      </button>
      <button onClick={() => findPath('bfs')} type="button">
        BFS GO
      </button>
      <button onClick={() => findPath('dijkstra')} type="button">
        Dijkstra GO
      </button>
      <button onClick={() => generateNewNodes('randomBlock')} type="button">
        Generate
      </button>
      <button onClick={() => generateNewNodes('d-mode')} type="button">
        D-mode
      </button>
      <div className="grid">
        {nodes.map((row, idx) => (
          <div key={idx} id={`row-${idx}`} className="grid-row">
            {row.map((node, idx) => {
              const extra = getNodeClassName(node)
              const nodeColor = getNodeColor(node)
              return (
                <div
                  key={idx}
                  id={`node-${node.row}-${node.col}`}
                  className={extra}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  style={nodeColor}
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
