import { type Node } from './nodeProcessor'

export interface VisualizedNode {
  visitedNodes: Node[]
  shortestPath: Node[]
}

export function resetAnimate(visualizedNode: VisualizedNode) {
  visualizedNode.visitedNodes.forEach((node) => {
    node.isVisited = false
    const element = document.getElementById(`node-${node.row}-${node.col}`)
    if (element) {
      element.className = element.className.replace(/visited/i, '')
      element.className = element.className.replace(/path/i, '')
    }
  })
}

export function animateNodes(visualizedNode: VisualizedNode) {
  resetAnimate(visualizedNode)
  visualizedNode.visitedNodes.forEach((node, i) => {
    if (node.isStart || node.isEnd) {
      return
    }
    setTimeout(() => {
      const element = document.getElementById(`node-${node.row}-${node.col}`)
      if (element) {
        element.classList.add('visited')
      }
    }, 20 * i)
  })

  visualizedNode.shortestPath.forEach((node, j) => {
    if (node.isStart || node.isEnd) {
      return
    }
    setTimeout(
      () => {
        const element = document.getElementById(`node-${node.row}-${node.col}`)
        if (element) {
          element.classList.add('path')
        }
      },
      visualizedNode.visitedNodes.length * 20 + 30 * j
    )
  })
}
