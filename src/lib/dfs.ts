import { type Node } from './nodeProcessor'

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

      const directions: [dx: number, dy: number][] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
      ]

      directions.forEach(([dx, dy]) => {
        if (
          currentNode.row + dx >= 0 &&
          currentNode.row + dx < nodes.length &&
          currentNode.col + dy >= 0 &&
          currentNode.col + dy < nodes[0].length
        ) {
          const neighbor = nodes[currentNode.row + dx][currentNode.col + dy]

          if (!neighbor.isVisited && neighbor.opaque !== 1) {
            stack.push(neighbor)
          } else {
            neighbor.previousNode = currentNode
          }
        }
      })
    }
  }

  return { visitedNodes, shortestPath }
}
