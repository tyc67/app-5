import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

export default function Dijkstra(nodes: Node[][], startNode: Node, endNode: Node) {
  const visitedNodes: Node[] = []
  startNode.distance = 0
  visitedNodes.push(startNode)
  const shortestPath: Node[] = []

  while (visitedNodes.length > 0) {
    let currentNode: Node | null = null
    let minDistance = Infinity

    for (const row of nodes) {
      for (const node of row) {
        if (!node.isVisited && node.distance < minDistance) {
          minDistance = node.distance
          currentNode = node
        }
      }
    }
    if (currentNode === null) break

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
      if (!neighbor.isVisited) {
        const tentativeDistance = currentNode.distance + 1
        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance
          neighbor.previousNode = currentNode
        }
      }
    }
  }

  return { visitedNodes, shortestPath }
}
