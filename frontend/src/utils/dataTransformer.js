// src/utils/dataTransformer.js
import { Position } from '@xyflow/react';

import dagre from 'dagre';

// 导入你的 JavaScript 格式的初始数据
import initialGraphData from '../data'; // 假设你的数据文件叫 src/data.js

// 基础节点宽度和高度，用于布局计算
const nodeWidth = 172;
const nodeHeight = 36;

// ==========================================================
// 1. 自动布局函数 (使用 Dagre)
// ==========================================================
const getLayoutedElements = (nodes, edges, direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === 'LR';

    // *** 关键：设置布局参数，增加节点间距 ***
    dagreGraph.setGraph({
        // *** 关键修改：方向设置为 LR (Left-to-Right) ***
        rankdir: direction, // 现在 direction 默认为 'LR'
        ranksep: 100,
        nodesep: 50,
    });
    // *******************************************

    // 1. 设置图中的所有节点
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // 2. 设置图中的所有边
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    // 3. 运行布局算法
    dagre.layout(dagreGraph);

    // 4. 应用计算出的位置到 React Flow 节点
    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        // Dagre 的坐标以中心为基准，React Flow 需要左上角坐标
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };

        return node;
    });

    return { nodes, edges };
};


// ==========================================================
// 2. 数据转换和准备函数
// ==========================================================
export const getInitialElements = () => {
    // 步骤 1: 正常转换原始数据中的节点和边
    // 转换节点数据到 React Flow 格式
    const rfNodes = initialGraphData.nodes.map(node => ({
        id: node.id,
        // data 属性用于存储你的所有自定义信息
        data: {
            name: node.name,
            type: node.type,
            time: node.time,
            value: node.value,
        },
        // node.type 可以决定 React Flow 使用哪种自定义组件来渲染它
        type: node.type === 'job' ? 'jobNode' : 'skillNode',
        position: { x: 0, y: 0 }, // 初始占位，将被布局算法覆盖
    }));

    // 转换边数据到 React Flow 格式
    const rfEdges = initialGraphData.edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        // *** 移除 label，不再显示百分比文字 ***
        // label: `${(edge.necessity * 100).toFixed(0)}% 依赖`, 

        // *** 关键修改：用线的不透明度表示依赖性 ***
        style: {
            strokeWidth: 2.5, // 给所有线一个固定的宽度
            stroke: 'black', // 设置线的颜色
            opacity: edge.necessity, // 将依赖度直接映射到不透明度
        },
    }));

    // --- 动态添加 "You" 节点和边的逻辑 ---

    // 步骤 2: 找出所有作为 "目标" 的节点 ID
    const targetNodeIds = new Set(rfEdges.map(edge => edge.target));

    // 步骤 3: 筛选出所有没有前置依赖的 "技能" 节点 (根技能)
    const rootSkillNodes = rfNodes.filter(
        node => node.data.type === 'skill' && !targetNodeIds.has(node.id)
    );

    // 步骤 4: 如果存在根技能，则创建 "You" 节点
    if (rootSkillNodes.length > 0) {
        const youNode = {
            id: 'you',
            // 保持 data 结构与其他节点一致
            data: { name: 'You', type: 'you' },
            // *** 关键修改：使用 'skillNode' 类型，让 CustomNode 来渲染它 ***
            // CustomNode 内部会因为它 data.type 不是 'job' 而给它一个非职业的样式
            type: 'skillNode',
            position: { x: 0, y: 0 },
            // 移除 sourcePosition，因为 CustomNode 已经定义了 Handle 的位置
        };
        rfNodes.push(youNode);

        // 步骤 5: 为每个根技能创建从 "You" 出发的边
        rootSkillNodes.forEach(skillNode => {
            const newEdge = {
                id: `you->${skillNode.id}`,
                source: 'you',
                target: skillNode.id,
                style: {
                    strokeWidth: 2.5, // 与其他线保持一致的宽度
                    stroke: 'black',
                    opacity: 1, // 起始边默认完全不透明
                },
            };
            rfEdges.push(newEdge);
        });
    }

    // 应用自动布局
    return getLayoutedElements(rfNodes, rfEdges, 'LR');
};