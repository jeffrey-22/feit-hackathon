// src/App.jsx

import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
} from '@xyflow/react';

import CustomNode from './components/CustomNode';
import SimpleLineEdge from './components/SimpleLineEdge'; // 1. 导入新的自定义边组件

// 我们需要原始数据来进行动态筛选
import initialGraphData from './data.jsx';
import { getLayoutedElements } from './utils/layoutHelper'; // 假设布局逻辑被移到了一个辅助文件中

// 注册自定义节点类型
const nodeTypes = {
  skill: CustomNode,
  job: CustomNode,
};

// 2. 注册自定义边类型
const edgeTypes = {
  straightLine: SimpleLineEdge,
};

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

// 核心逻辑：查找一个 Job 的所有前置技能（反向图遍历）
const findPrerequisiteSkills = (jobId, allNodes, allEdges) => {
  const skillNodeIds = new Set();
  const queue = [jobId];
  const visited = new Set([jobId]);

  // 创建一个从目标节点到源节点的映射，便于反向查找
  const edgesByTarget = new Map();
  allEdges.forEach(edge => {
    if (!edgesByTarget.has(edge.target)) {
      edgesByTarget.set(edge.target, []);
    }
    edgesByTarget.get(edge.target).push(edge.source);
  });

  while (queue.length > 0) {
    const currentNodeId = queue.shift();
    const prerequisiteIds = edgesByTarget.get(currentNodeId) || [];

    for (const prereqId of prerequisiteIds) {
      if (!visited.has(prereqId)) {
        visited.add(prereqId);
        const node = allNodes.find(n => n.id === prereqId);
        if (node && node.type === 'skill') {
          skillNodeIds.add(prereqId);
          queue.push(prereqId); // 继续向上查找
        }
      }
    }
  }
  return skillNodeIds;
};

function CareerGraph() {
  const { nodes: allNodes, edges: allEdges } = initialGraphData;
  const jobNodes = useMemo(() => allNodes.filter(node => node.type === 'job'), [allNodes]);

  // 状态：当前选中的 Job ID。默认选中第一个 Job。
  const [selectedJobId, setSelectedJobId] = useState(jobNodes[0]?.id);

  // 动态计算要显示的节点和边
  const { layoutedNodes, layoutedEdges } = useMemo(() => {
    if (!selectedJobId) {
      // 降级情况：如果没有选中任何 Job，只显示 Job 节点
      return getLayoutedElements(jobNodes, [], { direction: 'LR' });
    }

    // 1. 找出所有需要展示的 Skill 节点的 ID
    const prerequisiteSkillIds = findPrerequisiteSkills(selectedJobId, allNodes, allEdges);

    // 2. 准备要展示的节点：所有 Job 节点 + 相关的 Skill 节点
    const nodesToDisplay = allNodes.filter(node =>
      node.type === 'job' || prerequisiteSkillIds.has(node.id)
    );

    // 3. 为节点添加 data.selected 属性，用于 CustomNode 渲染
    const styledNodes = nodesToDisplay.map(node => ({
      ...node,
      data: { ...node.data, label: node.name, selected: node.id === selectedJobId }
    }));

    // 4. 准备要展示的边
    const displayedNodeIds = new Set(nodesToDisplay.map(n => n.id));
    const edgesToDisplay = allEdges.filter(edge =>
      displayedNodeIds.has(edge.source) && displayedNodeIds.has(edge.target)
    );

    // 5. 计算布局
    return getLayoutedElements(styledNodes, edgesToDisplay, { direction: 'LR' });

  }, [selectedJobId, allNodes, allEdges, jobNodes]);

  // 事件处理：当节点被点击时
  const onNodeClick = useCallback((event, node) => {
    // 只响应对 'job' 类型节点的点击
    if (node.type === 'job') {
      setSelectedJobId(node.id);
    }
  }, []); // 依赖为空，因为 setSelectedJobId 是稳定的

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'white' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={layoutedNodes}
          edges={layoutedEdges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes} // 3. 将自定义边类型传递给 ReactFlow
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default CareerGraph;