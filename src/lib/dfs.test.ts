import dfs from './dfs'

describe('dfs', () => {
  it('should find a path as expected', () => {
    const matrix = [
      [
        {
          col: 0,
          row: 0,
          distance: 1,
          opaque: 0,
          isEnd: false,
          isStart: true,
          isVisited: false,
          isVisualized: false,
          isPath: false,
          previousNode: null,
        },
        {
          col: 0,
          row: 1,
          distance: 1,
          opaque: 0,
          isEnd: true,
          isStart: false,
          isVisited: false,
          isVisualized: false,
          isPath: false,
          previousNode: null,
        },
      ],
    ]
    const actual = dfs(matrix, matrix[0][0], matrix[0][1])
    expect(actual.shortestPath).toEqual([matrix[0][0], matrix[0][1]])
    expect(actual.visitedNodes).toEqual([matrix[0][0], matrix[0][1]])
  })
})
