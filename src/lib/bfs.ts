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

export default function BFS(nodes: Node[][], startNode: Node, endNode: Node) {
  const queue: Node[] = []
  const visitedNodes = []
  const shortestPath: Node[] = []

  queue.push(startNode)
  while (queue.length > 0) {
    const currentNode = queue.shift()
    if (currentNode) {
      currentNode.isVisited = true
      visitedNodes.push(currentNode)
      if (currentNode === endNode) {
        let pathNode = endNode
        shortestPath.push(endNode)
        while (pathNode !== startNode) {
          pathNode = pathNode.previousNode as Node
          shortestPath.unshift(pathNode)
        }

        return { visitedNodes, shortestPath }
      }

      const neighbors = getNeighbors(currentNode, nodes)
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !queue.includes(neighbor)) {
          queue.push(neighbor)
          neighbor.distance = currentNode.distance + 1
          neighbor.previousNode = currentNode
        }
      }
    }
  }

  return { visitedNodes, shortestPath }
}
