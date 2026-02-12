import { Button, Empty, Modal, Typography } from 'antd';
import type { FC } from 'react';

import type { ThreadSocketEventEntry } from '../types';

const { Text } = Typography;

interface SocketEventsModalProps {
  open: boolean;
  onClose: () => void;
  threadId: string | null;
  events: ThreadSocketEventEntry[];
  onCopyJson: () => void;
}

export const SocketEventsModal: FC<SocketEventsModalProps> = ({
  open,
  onClose,
  threadId,
  events,
  onCopyJson,
}) => {
  return (
    <Modal
      title="Thread Socket Events"
      open={open}
      onCancel={onClose}
      destroyOnClose
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={900}>
      {threadId ? (
        <>
          <Text type="secondary">
            {events.length} event
            {events.length === 1 ? '' : 's'} recorded for this thread.
          </Text>
          <div style={{ marginTop: 12 }}>
            <Button
              type="primary"
              onClick={onCopyJson}
              disabled={events.length === 0}>
              Copy events JSON
            </Button>
          </div>
        </>
      ) : (
        <Empty description="Select a thread to view events" />
      )}
    </Modal>
  );
};
