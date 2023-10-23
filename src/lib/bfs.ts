import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

export default function BFS(nodes: Node[][], startNode: Node, endNode: Node) {
  const queue: Node[] = []
  const visitedNodes = []
  const shortestPath: Node[] = []
  startNode.distance = 0
  queue.push(startNode)
  while (queue.length > 0) {
    const currentNode = queue.shift()
    if (currentNode) {
      currentNode.isVisited = true
      visitedNodes.push(currentNode)
      if (currentNode === endNode) {
        let pathNode = currentNode
        shortestPath.push(currentNode)
        while (pathNode !== startNode) {
          shortestPath.unshift(pathNode)
          pathNode = pathNode.previousNode as Node
        }
        break
      }

      const neighbors = getNeighbors(currentNode, nodes)
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !queue.includes(neighbor)) {
          queue.push(neighbor)
          neighbor.previousNode = currentNode
        }
      }
    }
  }

  return { visitedNodes, shortestPath }
}
