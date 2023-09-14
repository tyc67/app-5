export interface Node {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isBlock: boolean
  isVisited: boolean
  previousNode: unknown
}

export const getNode = (
  row: number,
  col: number,
  startIndex: number[],
  endIndex: number[],
  isBlock: boolean
): Node => ({
  row,
  col,
  isStart: row === startIndex[0] && col === startIndex[1],
  isEnd: row === endIndex[0] && col === endIndex[1],
  isBlock,
  isVisited: false,
  previousNode: null,
})

export const getGrid = (
  rowLength: number,
  colLength: number,
  isRandomBlock: boolean,
  startIndex: number[],
  endIndex: number[]
) => {
  const grid = []
  for (let row = 0; row < rowLength; row++) {
    const currentRow = []
    for (let col = 0; col < colLength; col++) {
      if (isRandomBlock) {
        let randomness = Math.random() ** 2 >= 0.5
        if ((row === startIndex[0] && col === startIndex[1]) || (row === endIndex[0] && col === endIndex[1])) {
          randomness = false
        }
        currentRow.push(getNode(row, col, startIndex, endIndex, randomness))
      } else {
        currentRow.push(getNode(row, col, startIndex, endIndex, false))
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
