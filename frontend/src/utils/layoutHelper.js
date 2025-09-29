// /home/purinliang/feit-hackathon/frontend/src/utils/layoutHelper.jsx

import dagre from 'dagre';

const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeDimensions = { width: 180, height: 50 };

export const getLayoutedElements = (nodes, edges, options) => {
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => {
        // 使用节点的 dagre 属性（如果有的话）
        const nodeConfig = { ...nodeDimensions };
        if (node.dagre) {
            Object.assign(nodeConfig, node.dagre);
        }
        g.setNode(node.id, nodeConfig);
    });

    dagre.layout(g);

    return {
        layoutedNodes: nodes.map((node) => {
            const { x, y } = g.node(node.id);
            return { ...node, position: { x, y } };
        }),
        layoutedEdges: edges,
    };
};
