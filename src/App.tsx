import { useState, useEffect } from 'react'
import { getGrid, type Node, MatrixMode } from './lib/nodeProcessor'
import './App.css'
import DFS from './lib/dfs'
import BFS from './lib/bfs'
import Dijkstra from './lib/Dijkstra'
import ModeButton from './components/ModeButton'
import MethodButton from './components/MethodButton'
import Matrix from './components/Matrix'

interface VisualizedNode {
  visitedNodes: Node[]
  shortestPath: Node[]
}

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
        <div className="mode">
          <ModeButton
            onClick={() => handleMatrixMode('block-mode')}
            isCurrentMode={matrixMode === 'block-mode' ? true : false}
          >
            Mode 1
          </ModeButton>
          <ModeButton
            onClick={() => handleMatrixMode('diverse-mode')}
            isCurrentMode={matrixMode === 'diverse-mode' ? true : false}
          >
            Mode 2
          </ModeButton>
        </div>
        <div className="method">
          <MethodButton onClick={() => findPath('dfs')}>DFS</MethodButton>
          <MethodButton onClick={() => findPath('bfs')}>BFS</MethodButton>
          <MethodButton onClick={() => findPath('dijkstra')}>Dijkstra</MethodButton>
        </div>
      </div>
      <Matrix nodes={nodes} handleMouseDown={handleMouseDown} />
    </>
  )
}

export default App
