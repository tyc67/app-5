import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

export default function DFS(nodes: Node[][], startNode: Node, endNode: Node) {
  const stack: Node[] = []
  const visitedNodes = []
  const shortestPath: Node[] = []
  stack.push(startNode)
  while (stack.length > 0) {
    const currentNode = stack.pop()
    if (currentNode) {
      currentNode.isVisited = true
      visitedNodes.push(currentNode)
      if (currentNode === endNode) {
        return { visitedNodes, shortestPath }
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

  return { visitedNodes, shortestPath }
}
