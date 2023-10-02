import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

// const directions: [dx: number, dy: number][] = [[1,0],[0,1], [-1,0], [0,-1]]

// function bfs(row:number, col: number, nodes: Node[][], endNode: Node) {
//   const stack: Node[] = [nodes[col][row]]
//   const answer: Node[] = []

//   while(stack.length) {
//     const curr = stack.pop()
//     answer.push(curr!);
//     for(const [dx, dy] of directions) {
//       const neighbor = nodes[col + dy][row + dx]
//       if(neighbor === endNode) {
//         return answer
//       }
//       if(neighbor) stack.push(neighbor)
//     }
//   }

// }

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
          // shortestPath.sort((a,b)=>a.distance-b.distance)
        }
        break
      }

      const neighbors = getNeighbors(currentNode, nodes)
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !queue.includes(neighbor)) {
          queue.push(neighbor)
          // neighbor.distance = currentNode.distance + neighbor.opaque
          neighbor.previousNode = currentNode
          //   const tentativeDistance = currentNode.distance + neighbor.opaque
          //   if (tentativeDistance < neighbor.distance) {
          //     neighbor.distance = tentativeDistance
          //     neighbor.previousNode = currentNode
          //   }
        }
      }
    }
  }

  return { visitedNodes, shortestPath }
}
