import { Modal, Typography } from 'antd';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { simpleMarkdownComponents } from '../../../components/markdown/markdownComponentOverrides';

const { Text } = Typography;

interface NodeInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
  instructionsText: string;
}

export const NodeInstructionsModal: FC<NodeInstructionsModalProps> = ({
  visible,
  onClose,
  instructionsText,
}) => (
  <Modal
    open={visible}
    title="Agent instructions"
    footer={null}
    onCancel={onClose}
    destroyOnClose
    width={520}
    styles={{ body: { maxHeight: 420, overflowY: 'auto' } }}>
    {instructionsText ? (
      <div
        style={{
          margin: 0,
          wordBreak: 'break-word',
          fontSize: 13,
          lineHeight: 1.6,
        }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={simpleMarkdownComponents}>
          {instructionsText}
        </ReactMarkdown>
      </div>
    ) : (
      <Text type="secondary">No instructions available.</Text>
    )}
  </Modal>
);
