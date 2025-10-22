import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, Space, Button, Typography, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { GraphNodeData } from '../types';

const { Text } = Typography;

export const CustomNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as GraphNodeData;
  const templateKind = nodeData.templateSchema?.kind;

  return (
    <Card
      size="small"
      style={{
        minWidth: 200,
        border: selected ? '1px solid #1890ff' : '1px solid #d9d9d9',
        borderRadius: 8,
        boxShadow: selected
          ? '0 4px 12px rgba(24, 144, 255, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
      styles={{ body: { padding: 12 } }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text strong style={{ fontSize: 14 }}>
            {nodeData.label}
          </Text>
          <Space size="small">
            {nodeData.onDelete && (
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  nodeData.onDelete?.();
                }}
              />
            )}
          </Space>
        </div>

        {/* Template name in smaller gray text */}
        <Text type="secondary" style={{ fontSize: 11, color: '#8c8c8c' }}>
          {nodeData.template}
        </Text>

        {templateKind && (
          <Tag color="blue" style={{ margin: 0 }}>
            {templateKind}
          </Tag>
        )}

        {Object.keys(nodeData.config).length > 0 && (
          <Text type="secondary" style={{ fontSize: 11 }}>
            {Object.keys(nodeData.config).length} parameter(s)
          </Text>
        )}
      </Space>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
    </Card>
  );
};
