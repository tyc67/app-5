import { type Node } from './nodeProcessor'
import { getNeighbors } from './neighborsNode'

export function Dijkstra1(nodes: Node[][], startNode: Node, endNode: Node) {
  const visitedNodes: Node[] = []
  startNode.distance = 0
  visitedNodes.push(startNode)
  const shortestPath: Node[] = []

  // O(MxN)
  while (visitedNodes.length > 0) {
    let currentNode: Node | null = null
    let minDistance = Infinity
    // O(N^2) ((1+N)*N)/2
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
        let tentativeDistance = currentNode.distance
        if (neighbor.opaque === 0) {
          tentativeDistance = currentNode.distance + 1
        } else {
          tentativeDistance = currentNode.distance + neighbor.opaque
        }
        if (tentativeDistance < neighbor.distance) {
          neighbor.distance = tentativeDistance
          neighbor.previousNode = currentNode
        }
      }
    }
  }

  return { visitedNodes, shortestPath }
}

// named export
export function Dijkstra2(nodes: Node[][], startNode: Node, endNode: Node) {
  let k = 0
  const maxIteration = nodes.length * nodes[0].length
  startNode.distance = 0
  startNode.isVisited = true
  const fakeMinHeap: Node[] = [startNode]
  const shortestPath: Node[] = []
  const visitedNodes: Node[] = []

  while (fakeMinHeap.length && ++k < maxIteration) {
    const min = fakeMinHeap.shift()!
    visitedNodes.push(min)

    if (min.col === endNode.col && min.row === endNode.row) {
      let curr = min
      while (curr) {
        shortestPath.unshift(curr)
        curr = curr.previousNode as Node
      }
      break
    }

    const neighbors = getNeighbors(min, nodes)
    for (const neighbor of neighbors) {
      if (neighbor.isVisited) continue
      neighbor.isVisited = true
      neighbor.distance = neighbor.opaque + min.distance
      neighbor.previousNode = min
      fakeMinHeap.push(neighbor)
    }

    // sort heap array
    fakeMinHeap.sort((a, b) => a.distance - b.distance)
  }

  if (k >= maxIteration) {
    alert('infinite loop')
  }

  return { visitedNodes, shortestPath }
}

export default Dijkstra2
