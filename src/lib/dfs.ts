import { type Node } from './nodeProcessor'

const getNeighbors = (node: Node, grid: Node[][]) => {
  const neighbors = []
  const { row, col } = node
  const offsets = [
    { row: -1, col: 0 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: 0, col: 1 },
  ]

  for (const offset of offsets) {
    const newRow = row + offset.row
    const newCol = col + offset.col

    if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
      const neighbor = grid[newRow][newCol]

      if (!neighbor.isVisited && !neighbor.isBlock) {
        neighbors.push(neighbor)
      }
    }
  }

  return neighbors
}

export default function DFS(nodes: Node[][], startNode: Node, endNode: Node) {
  const stack: Node[] = []
  const visitedNodes = []
  stack.push(startNode)
  while (stack.length > 0) {
    const currentNode = stack.pop()
    if (currentNode) {
      currentNode.isVisited = true
      visitedNodes.push(currentNode)
      if (currentNode === endNode) {
        return visitedNodes
      }

      const neighbors = getNeighbors(currentNode, nodes)
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
          stack.push(neighbor)
        } else {
          neighbor.previousNode = currentNode
        }
      }
    }
  }

  return visitedNodes
}
