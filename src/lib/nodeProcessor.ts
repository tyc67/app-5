import { Node } from '../App'

export const getNode = (row: number, col: number, startNode: number[], endNode: number[], isBlock: boolean) => ({
  row,
  col,
  isStart: row === startNode[0] && col === startNode[1],
  isEnd: row === endNode[0] && col === endNode[1],
  isBlock,
})

export const getGrid = (
  rowLength: number,
  colLength: number,
  isRandomBlock: boolean,
  startNode: number[],
  endNode: number[]
) => {
  const grid = []
  for (let row = 0; row < rowLength; row++) {
    const currentRow = []
    for (let col = 0; col < colLength; col++) {
      if (isRandomBlock) {
        let randomness = Math.random() ** 2 >= 0.5
        if ((row === startNode[0] && col === startNode[1]) || (row === endNode[0] && col === endNode[1])) {
          randomness = false
        }
        currentRow.push(getNode(row, col, startNode, endNode, randomness))
      } else {
        currentRow.push(getNode(row, col, startNode, endNode, false))
      }
    }
    grid.push(currentRow)
  }
  return grid
}

export const getNodeClassName = (node: Node) => {
  switch (true) {
    case node.isStart:
      return 'start'
    case node.isEnd:
      return 'end'
    case node.isBlock:
      return 'block'
    default:
      return ''
  }
}
