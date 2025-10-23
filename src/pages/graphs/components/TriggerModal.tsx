import { useState } from 'react';
import { Button, Modal, Input, Typography } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Text } = Typography;

interface TriggerModalProps {
  visible: boolean;
  onCancel: () => void;
  onTrigger: (message: string, threadSubId?: string) => Promise<void>;
  nodeId?: string;
  nodeName?: string;
  loading?: boolean;
}

export const TriggerModal = ({
  visible,
  onCancel,
  onTrigger,
  nodeId,
  nodeName,
  loading = false,
}: TriggerModalProps) => {
  const [triggerMessage, setTriggerMessage] = useState('');
  const [threadSubId, setThreadSubId] = useState('');

  const handleTrigger = async () => {
    if (triggerMessage.trim()) {
      await onTrigger(triggerMessage, threadSubId.trim() || undefined);
      setTriggerMessage('');
    }
  };

  const handleCancel = () => {
    setTriggerMessage('');
    setThreadSubId('');
    onCancel();
  };

  return (
    <Modal
      title="Trigger Node"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="trigger"
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={handleTrigger}
          loading={loading}
          disabled={!triggerMessage.trim() || loading}>
          Trigger
        </Button>,
      ]}>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Node: {nodeName || nodeId}</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Enter message for trigger:</Text>
      </div>
      <TextArea
        value={triggerMessage}
        onChange={(e) => setTriggerMessage(e.target.value)}
        placeholder="Enter trigger message..."
        rows={4}
        style={{ marginBottom: 16 }}
      />

      <div style={{ marginBottom: 16 }}>
        <Text strong>Thread Sub-ID (optional):</Text>
      </div>
      <Input
        value={threadSubId}
        onChange={(e) => setThreadSubId(e.target.value)}
        placeholder="Enter thread sub-ID (optional)..."
        style={{ marginBottom: 16 }}
      />
    </Modal>
  );
};
