import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Modal, Input, Typography } from 'antd';
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
  selectedThreadId?: string;
  selectedThreadName?: string | null;
  selectedThreadSource?: string | null;
}

export const TriggerModal = ({
  visible,
  onCancel,
  onTrigger,
  nodeId,
  nodeName,
  loading = false,
  selectedThreadId,
  selectedThreadName,
  selectedThreadSource,
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
      // Reset when not loading or modal hidden
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setShowLongRunningHint(false);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible, loading]);

  const handleTrigger = async () => {
    if (triggerMessage.trim()) {
      await onTrigger(triggerMessage, selectedThreadId);
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
        <Text strong>Thread:</Text>
        <div style={{ marginTop: 4 }}>
          {!selectedThreadId ? (
            <Text type="secondary">
              No thread selected. A new thread will be created automatically on
              first execution.
            </Text>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text type="success">
                Using selected thread: {selectedThreadName || selectedThreadId}
              </Text>
              {selectedThreadSource ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Source: {selectedThreadSource}
                </Text>
              ) : null}
            </div>
          )}
        </div>
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
