import { Button, Modal } from 'antd';
import type { FC } from 'react';

import { MarkdownSplitEditor } from '../../../components/markdown/MarkdownSplitEditor';

interface AiSuggestionLinkProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const AiSuggestionLink: FC<AiSuggestionLinkProps> = ({
  onClick,
  disabled,
  label = 'Improve with AI',
}) => (
  <Button
    type="link"
    size="small"
    style={{ padding: 0, height: 'auto', fontSize: 12 }}
    onClick={onClick}
    disabled={disabled}>
    {label}
  </Button>
);

interface NodeExpandedTextareaModalProps {
  expandedTextarea: { fieldKey: string; value: string } | null;
  onSave: () => void;
  onCancel: () => void;
  onChange: (next: { fieldKey: string; value: string }) => void;
  /** Whether AI suggestion link is shown */
  showAiSuggestion?: boolean;
  isGraphRunning?: boolean;
  onOpenAiSuggestion?: () => void;
}

export const NodeExpandedTextareaModal: FC<NodeExpandedTextareaModalProps> = ({
  expandedTextarea,
  onSave,
  onCancel,
  onChange,
  showAiSuggestion = false,
  isGraphRunning = false,
  onOpenAiSuggestion,
}) => (
  <Modal
    title="Edit Text"
    open={!!expandedTextarea}
    onCancel={onCancel}
    width={1200}
    footer={[
      <Button key="cancel" onClick={onCancel}>
        Cancel
      </Button>,
      <Button key="save" type="primary" onClick={onSave}>
        Save
      </Button>,
    ]}>
    {expandedTextarea && (
      <>
        <MarkdownSplitEditor
          value={expandedTextarea.value}
          onChange={(nextValue) =>
            onChange({
              ...expandedTextarea,
              value: nextValue,
            })
          }
          height={520}
          placeholder="Enter markdown…"
          initialMode="split"
        />
        {showAiSuggestion && (
          <AiSuggestionLink
            onClick={() => onOpenAiSuggestion?.()}
            disabled={!isGraphRunning}
            label="Improve with AI"
          />
        )}
      </>
    )}
  </Modal>
);
