import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, Space, Button, Typography, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { GraphNodeData } from '../types';

const { Text } = Typography;

export const CustomNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as GraphNodeData;

  // Get node kind color based on template kind
  const getKindColor = (kind?: string) => {
    const colorMap: Record<string, string> = {
      'runtime': 'blue',
      'tool': 'green',
      'simpleagent': 'orange',
      'trigger': 'red',
      'resource': 'purple',
      'default': 'gray',
    };
    return colorMap[kind?.toLowerCase() || 'default'] || 'gray';
  };

  // Get metadata properties that should be shown on node
  const getMetadataProperties = () => {
    if (!nodeData.templateSchema?.properties) return [];

    return Object.entries(nodeData.templateSchema.properties)
      .filter(([_, prop]) => {
        const typedProp = prop as any;
        return typedProp['x-ui:show-on-node'] === true;
      })
      .map(([key, prop]) => {
        const typedProp = prop as any;
        return {
          key,
          value:
            nodeData.config[key] || typedProp.const || typedProp.default || '',
          title: typedProp.title || key,
        };
      })
      .filter((item) => !!item.value);
  };

  const metadataProperties = getMetadataProperties();

  return (
    <Card
      size="small"
      style={{
        minWidth: 250,
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
            gap: 20,
          }}>
          <Space size="small">
            <Text
              strong
              style={{
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: 250,
                display: 'block',
              }}>
              {nodeData.label}
            </Text>
            <Tag
              color={getKindColor(nodeData.templateKind)}
              style={{ margin: 0, fontSize: 10 }}>
              {nodeData.templateKind}
            </Tag>
            <Tag color="geekblue" style={{ margin: 0, fontSize: 10 }}>
              {nodeData.template}
            </Tag>
          </Space>

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

        {/* Metadata properties */}
        {metadataProperties.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {metadataProperties.map(({ key, value, title }) => (
              <Tag
                key={key}
                color="default"
                style={{ fontSize: 10, margin: 0 }}>
                {title}: {String(value)}
              </Tag>
            ))}
          </div>
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
