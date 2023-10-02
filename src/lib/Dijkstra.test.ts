import { Dijkstra1, Dijkstra2 } from './Dijkstra'
import type { Node } from './nodeProcessor'

// mocked matrix
// o 1 1 1
// 4 2 5 1
// 4 2 9 1
// 2 0 x 9

const getMatrix = (): Node[][] => {
  return [
    [0, 1, 1, 1],
    [42, 10, 50, 1],
    [40, 20, 90, 1],
    [2, 10, 0, 99],
  ].map((row, r) =>
    row.map((col, c) => ({
      col: c,
      row: r,
      opaque: col * 0.01,
      isVisited: false,
      isEnd: false,
      isStart: false,
      distance: Infinity,
      isVisualized: false,
      isPath: false,
      previousNode: null,
    }))
  )
}

// expected order
// o 1 2 3
// ? 6 ? 4
// ? 7 ? 5
// ? 8 x ?

const expectedLookup = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [1, 1],
  [2, 1],
  [3, 1],
  [3, 2],
]

const expectedShortestPath = [
  [0, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [3, 2],
]

describe('Dijkstra', () => {
  test.each`
    algorithm    | lookup            | shortestPath
    ${Dijkstra1} | ${expectedLookup} | ${expectedShortestPath}
    ${Dijkstra2} | ${expectedLookup} | ${expectedShortestPath}
  `(
    'if algorithm is correct',
    ({
      algorithm,
      lookup,
      shortestPath,
    }: {
      shortestPath: typeof expectedShortestPath
      lookup: typeof expectedLookup
      algorithm: typeof Dijkstra1
    }) => {
      const mat = getMatrix()
      const actual = algorithm(mat, mat[0][0], mat[3][2])
      const actualLookup = actual.visitedNodes.map((node) => [node.row, node.col])
      const actualAnswer = actual.shortestPath.map((node) => [node.row, node.col])
      expect(actualAnswer).toStrictEqual(shortestPath)
      expect(actualLookup).toStrictEqual(lookup)
    }
  )
})
