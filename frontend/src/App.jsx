// src/App.jsx

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import CustomNode from './components/CustomNode';
import SimpleLineEdge from './components/SimpleLineEdge'; // 1. 导入新的自定义边组件
import { getInitialElements } from './utils/dataTransformer';

// 注册自定义节点类型
const nodeTypes = {
  skillNode: CustomNode,
  jobNode: CustomNode,
};

// 2. 注册自定义边类型
const edgeTypes = {
  straightLine: SimpleLineEdge,
};

const initialElements = getInitialElements();

// *** 新增：默认边的配置 ***
const defaultEdgeOptions = {
  // *** 关键修改：使用我们新注册的自定义边类型 'straightLine' ***
  type: 'straightLine',

  // 设置箭头的样式 (arrowclosed 是一个实心三角形箭头)
  markerEnd: {
    type: 'arrowclosed',
    width: 8, // 箭头宽度
    height: 8, // 箭头高度
    color: 'black', // 箭头颜色
  },
};
// **************************

function CareerGraph() {
  const [nodes, setNodes] = useNodesState(initialElements.nodes);
  // 注意：这里我们使用 getInitialElements 返回的边，但我们会在下一步修改它的数据结构。
  const [edges, setEdges] = useEdgesState(initialElements.edges);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes} // 3. 将自定义边类型传递给 ReactFlow
        // 应用新的默认边选项
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default CareerGraph;