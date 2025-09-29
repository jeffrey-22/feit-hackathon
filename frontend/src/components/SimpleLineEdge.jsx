// src/components/SimpleLineEdge.jsx
import { BaseEdge, getStraightPath } from '@xyflow/react';

/**
 * 这是一个自定义边组件，它只渲染一条简单的直线。
 *
 * @param {object} props - React Flow 传递的边属性
 * @param {string} props.id - 边的 ID
 * @param {number} props.sourceX - 起点 X 坐标
 * @param {number} props.sourceY - 起点 Y 坐标
 * @param {number} props.targetX - 终点 X 坐标
 * @param {number} props.targetY - 终点 Y 坐标
 * @param {object} props.markerEnd - 箭头标记
 * @param {object} props.style - 边的样式 (包括不透明度)
 */
export default function SimpleLineEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, style }) {
    // getStraightPath 会返回绘制直线所需的 SVG 路径数据
    const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });

    // BaseEdge 是一个辅助组件，用于方便地渲染路径和箭头
    return <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />;
}