import { PlayCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Input, Modal, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { TextArea } = Input;
const { Text } = Typography;

interface TriggerModalProps {
  visible: boolean;
  onCancel: () => void;
  onTrigger: (message: string) => Promise<void>;
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
  const [showLongRunningHint, setShowLongRunningHint] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Start a 10s timer when loading becomes true and modal is visible
    if (visible && loading) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = window.setTimeout(() => {
        setShowLongRunningHint(true);
      }, 10000);
    } else {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      setShowLongRunningHint(false);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, loading]);

  const handleTrigger = async () => {
    if (triggerMessage.trim()) {
      await onTrigger(triggerMessage);
      setTriggerMessage('');
    }
  };

  const handleCancel = () => {
    setTriggerMessage('');
    setShowLongRunningHint(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
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

      {showLongRunningHint ? (
        <Alert
          type="info"
          showIcon
          message="Trigger is running"
          description="You can close this window; it will continue in background. After closing, the threads list will be refreshed."
        />
      ) : null}
    </Modal>
  );
};
