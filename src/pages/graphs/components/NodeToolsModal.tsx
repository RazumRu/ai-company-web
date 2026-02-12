import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { Modal, Space, Typography } from 'antd';
import type { FC } from 'react';

const { Text } = Typography;

interface ConnectedTool {
  name: string;
  description: string;
  schema: Record<string, unknown>;
}

interface NodeToolsModalProps {
  visible: boolean;
  onClose: () => void;
  tools: ConnectedTool[];
}

export const NodeToolsModal: FC<NodeToolsModalProps> = ({
  visible,
  onClose,
  tools,
}) => (
  <Modal
    open={visible}
    title={`Connected Tools (${tools.length})`}
    footer={null}
    onCancel={onClose}
    destroyOnClose
    width={720}
    styles={{ body: { maxHeight: 560, overflowY: 'auto' } }}>
    {tools.length > 0 ? (
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {tools.map((tool) => (
          <div
            key={tool.name}
            style={{
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              padding: 16,
              background: '#fafafa',
            }}>
            <div style={{ marginBottom: 12 }}>
              <Text
                strong
                style={{
                  fontSize: 15,
                  display: 'block',
                  marginBottom: 8,
                }}>
                {tool.name}
              </Text>
              <Text
                type="secondary"
                style={{
                  fontSize: 13,
                  display: 'block',
                  wordBreak: 'break-word',
                }}>
                {tool.description}
              </Text>
            </div>
            <div
              style={{
                padding: 12,
                background: '#ffffff',
                borderRadius: 6,
                border: '1px solid #e8e8e8',
                maxHeight: 320,
                overflow: 'auto',
              }}>
              <JsonView
                value={tool.schema as object}
                style={lightTheme}
                collapsed={1}
              />
            </div>
          </div>
        ))}
      </Space>
    ) : (
      <Text type="secondary">No connected tools available.</Text>
    )}
  </Modal>
);
