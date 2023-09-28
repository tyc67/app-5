import { getNodeClassName, getNodeColor, type Node } from '../lib/nodeProcessor'

interface MatrixProps {
  nodes: Node[][]
  handleMouseDown: (row: number, col: number) => void
}

export default function Matrix({ nodes, handleMouseDown }: MatrixProps) {
  return (
    <div className="grid">
      {nodes.map((row, idx) => (
        <div key={idx} id={`row-${idx}`} className="grid-row">
          {row.map((node, idx) => {
            const extra = getNodeClassName(node)
            const nodeColor = getNodeColor(node)
            return (
              <div
                key={idx}
                id={`node-${node.row}-${node.col}`}
                className={extra}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                style={nodeColor}
              ></div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
