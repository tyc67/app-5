export interface Node {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  opaque: number
  isVisited: boolean
  isVisualized: boolean
  isPath: boolean
  distance: number
  previousNode: unknown
}

export const getNode = (row: number, col: number, startIndex: number[], endIndex: number[], opaque: number): Node => ({
  row,
  col,
  isStart: row === startIndex[0] && col === startIndex[1],
  isEnd: row === endIndex[0] && col === endIndex[1],
  opaque,
  isVisited: false,
  isVisualized: false,
  isPath: false,
  distance: Infinity,
  previousNode: null,
})

export const getGrid = (
  rowLength: number,
  colLength: number,
  option: string,
  startIndex: number[],
  endIndex: number[]
) => {
  const grid = []
  for (let row = 0; row < rowLength; row++) {
    const currentRow = []
    for (let col = 0; col < colLength; col++) {
      if (option === 'randomBlock') {
        let opqaue = 0
        if (Math.random() ** 2 >= 0.5) {
          opqaue = 1
        }
        if ((row === startIndex[0] && col === startIndex[1]) || (row === endIndex[0] && col === endIndex[1])) {
          opqaue = 0
        }
        currentRow.push(getNode(row, col, startIndex, endIndex, opqaue))
      } else if (option === 'd-mode') {
        const opaque = Math.random()
        currentRow.push(getNode(row, col, startIndex, endIndex, opaque))
      } else {
        currentRow.push(getNode(row, col, startIndex, endIndex, 0))
      }
    }
    grid.push(currentRow)
  }
  return grid
}

export const getNodeClassName = (node: Node) => {
  switch (true) {
    case node.isVisualized && !node.isPath:
      return 'node visited'
    case !node.isStart && !node.isEnd && node.isPath:
      return 'node path'
    default:
      return 'node'
  }
}

export const getNodeColor = (node: Node) => {
  switch (true) {
    case node.isStart:
      return { backgroundColor: `rgba(220, 38, 38, 0.8)` }
    case node.isEnd:
      return { backgroundColor: `rgba(16, 185, 129, 0.8)` }
    default:
      return { backgroundColor: `rgba(41, 37, 36, ${node.opaque})` }
  }
}
