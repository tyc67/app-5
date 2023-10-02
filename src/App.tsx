import { useState, useEffect } from 'react'
import { getGrid, type Node, MatrixMode } from './lib/nodeProcessor'
import './App.css'
import DFS from './lib/dfs'
import BFS from './lib/bfs'
import Dijkstra from './lib/Dijkstra'
import Matrix from './components/Matrix'
import MethodBar from './components/MethodBar'
import ModeBar from './components/ModeBar'

interface VisualizedNode {
  visitedNodes: Node[]
  shortestPath: Node[]
}

export type MethodOption = 'DFS' | 'BFS' | 'Dijkstra'

function App() {
  const rowLength = 30
  const colLength = 40
  const [startIndex, setStartIndex] = useState<number[]>([0, 0])
  const [endIndex, setEndIndex] = useState<number[]>([rowLength - 1, colLength - 1])
  const initialNodes = getGrid(rowLength, colLength, 'block-mode', startIndex, endIndex)
  const [nodes, setNodes] = useState<Node[][]>(initialNodes)
  const initialVisualizedNode = { visitedNodes: [], shortestPath: [] }
  const [visualizedNode, setVisualizedNode] = useState<VisualizedNode>(initialVisualizedNode)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [matrixMode, setMatrixMode] = useState<MatrixMode>('block-mode')

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
        if (matrixMode === 'diverse-mode') {
          const resetNodes = [...nodes]
          visitedNodes.forEach((node) => (resetNodes[node.row][node.col].isVisualized = false))
          setNodes(resetNodes)
        }
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
    if (isAnimating) return
    const updatedNodes = [...nodes]
    if (updatedNodes[selectRow][selectCol].opaque === 1) {
      updatedNodes[selectRow][selectCol].opaque = 0
    } else if (updatedNodes[selectRow][selectCol].opaque === 0) {
      updatedNodes[selectRow][selectCol].opaque = 1
    }
    setNodes(updatedNodes)
  }

  const findPath = (method: MethodOption) => {
    if (isAnimating) return
    const startNode = nodes[startIndex[0]][startIndex[1]]
    const endNode = nodes[endIndex[0]][endIndex[1]]
    let result: VisualizedNode
    switch (method) {
      case 'DFS':
        result = DFS(nodes, startNode, endNode)
        break
      case 'BFS':
        result = BFS(nodes, startNode, endNode)
        break
      case 'Dijkstra':
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
        node.distance = Infinity
        node.previousNode = null
      })
    })
    setNodes(updatedNodes)
    setVisualizedNode(initialVisualizedNode)
  }

  const handleMatrixMode = (mode: MatrixMode) => {
    if (isAnimating) return
    const newStartIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]
    const newEndIndex = [Math.floor(Math.random() * rowLength), Math.floor(Math.random() * colLength)]

    let newNodes: Node[][]

    if (mode === 'block-mode' || mode === 'diverse-mode') {
      newNodes = getGrid(rowLength, colLength, mode, newStartIndex, newEndIndex)
    } else {
      newNodes = nodes
    }
    setMatrixMode(mode)
    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
    setNodes(newNodes)
    setVisualizedNode(initialVisualizedNode)
  }

  return (
    <>
      <div className="top-bar">
        <ModeBar matrixMode={matrixMode} onClick={handleMatrixMode} />
        <MethodBar matrixMode={matrixMode} onClick={findPath} isAnimating={isAnimating} />
      </div>
      <Matrix nodes={nodes} handleMouseDown={handleMouseDown} />
    </>
  )
}

export default App
