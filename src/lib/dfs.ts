import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

// const directions: [dx: number, dy: number][] = [[1,0],[0,1], [-1,0], [0,-1]]

// async function dfs(node: Node, matrix: Node[][], endNode: Node, path: Node[], onVisit: (row: number, col: number) => void) {
//   let answer: Node[] | null = null
//   if(node === endNode && path.length) {
//     answer = [...path]
//   }

//   node.isVisited = true
//   onVisit(node.row, node.col)
//   path.push(node);

//   directions.forEach(([dx, dy]) => {
//     const neighbor = matrix[node.row + dx][node.col + dy]
//     if (neighbor.isBlock || neighbor.isVisited) return
//     if (!answer) {
//       answer = dfs(neighbor, matrix, endNode, path)
//     }
//   })

//   path.pop();

//   return answer

// }

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
