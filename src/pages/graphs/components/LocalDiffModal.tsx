import { Modal, Typography } from 'antd';

import { DiffHtmlView } from '../../../components/markdown/DiffHtmlView';

interface LocalDiffModalProps {
  visible: boolean;
  onClose: () => void;
  diffPatch: string;
  graphVersion?: string;
}

export const LocalDiffModal = ({
  visible,
  onClose,
  diffPatch,
  graphVersion,
}: LocalDiffModalProps) => (
  <Modal
    open={visible}
    onCancel={onClose}
    footer={null}
    title={
      graphVersion
        ? `Local changes diff (v${graphVersion})`
        : 'Local changes diff'
    }
    width={720}
    destroyOnClose>
    {diffPatch ? (
      <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
        <DiffHtmlView diff={diffPatch} />
      </div>
    ) : (
      <Typography.Text type="secondary">
        No local changes to display.
      </Typography.Text>
    )}
  </Modal>
);
