import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

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
