import { Alert, Button, Input, Modal, Select, Space, Typography } from 'antd';
import type { FC } from 'react';
import { useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { simpleMarkdownComponents } from '../../../components/markdown/markdownComponentOverrides';
import { MarkdownSplitEditor } from '../../../components/markdown/MarkdownSplitEditor';
import type { AiSuggestionState } from './NodeEditSidebar';

const { Text } = Typography;

interface NodeAiSuggestionModalProps {
  aiSuggestionState: AiSuggestionState | null;
  setAiSuggestionState: React.Dispatch<
    React.SetStateAction<AiSuggestionState | null>
  >;
  nodeDirtyWarning: boolean;
  suggestionDiffMarkdown: string | null;
  liteLlmModelOptions: { label: string; value: string }[];
  litellmModelsLoading: boolean;
  isGraphRunning: boolean;
  graphId?: string;
  nodeId?: string;
  onClose: () => void;
  onSubmit: () => void;
  onApply: () => void;
  onStartEditSuggested: () => void;
  onCancelEditSuggested: () => void;
  onApplyEditSuggested: () => void;
}

export const NodeAiSuggestionModal: FC<NodeAiSuggestionModalProps> = ({
  aiSuggestionState,
  setAiSuggestionState,
  nodeDirtyWarning,
  suggestionDiffMarkdown,
  liteLlmModelOptions,
  litellmModelsLoading,
  isGraphRunning,
  graphId,
  nodeId,
  onClose,
  onSubmit,
  onApply,
  onStartEditSuggested,
  onCancelEditSuggested,
  onApplyEditSuggested,
}) => {
  const title = aiSuggestionState?.fieldLabel
    ? `Improve ${aiSuggestionState.fieldLabel} with AI`
    : 'Improve instructions with AI';

  const handleModelChange = useCallback(
    (value: string) => {
      setAiSuggestionState((prev) => (prev ? { ...prev, model: value } : prev));
    },
    [setAiSuggestionState],
  );

  const handleUserRequestChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAiSuggestionState((prev) =>
        prev ? { ...prev, userRequest: e.target.value } : prev,
      );
    },
    [setAiSuggestionState],
  );

  const handleEditDraftChange = useCallback(
    (nextValue: string) => {
      setAiSuggestionState((prev) =>
        prev ? { ...prev, editSuggestionDraft: nextValue } : prev,
      );
    },
    [setAiSuggestionState],
  );

  const currentContentSection = useMemo(() => {
    if (!aiSuggestionState) return null;

    if (
      aiSuggestionState.lastSuggestedInstructions &&
      (aiSuggestionState.manualSuggestedOverride || suggestionDiffMarkdown)
    ) {
      if (aiSuggestionState.isEditingSuggestion) {
        return (
          <Space direction="vertical" style={{ width: '100%' }}>
            <MarkdownSplitEditor
              value={
                aiSuggestionState.editSuggestionDraft ??
                aiSuggestionState.manualSuggestedOverride ??
                aiSuggestionState.lastSuggestedInstructions
              }
              onChange={handleEditDraftChange}
              height={360}
              placeholder="Edit suggested content…"
              initialMode="split"
            />
            <Space>
              <Button onClick={onCancelEditSuggested} size="small">
                Cancel
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={onApplyEditSuggested}>
                Apply
              </Button>
            </Space>
          </Space>
        );
      }
      return (
        <Space direction="vertical" style={{ width: '100%' }}>
          <MarkdownSplitEditor
            value={suggestionDiffMarkdown ?? ''}
            readOnly
            height={360}
            initialMode="split"
            previewValue={
              aiSuggestionState.manualSuggestedOverride ??
              aiSuggestionState.lastSuggestedInstructions ??
              ''
            }
            onModeChange={(nextMode) => {
              if (nextMode === 'edit') {
                onStartEditSuggested();
              }
            }}
            shouldChangeMode={(nextMode) => nextMode !== 'edit'}
          />
        </Space>
      );
    }

    if (aiSuggestionState.currentInstructions.trim()) {
      return (
        <div style={{ maxHeight: 280, overflowY: 'auto' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={simpleMarkdownComponents}>
            {aiSuggestionState.currentInstructions}
          </ReactMarkdown>
        </div>
      );
    }

    return <Text type="secondary">No content available.</Text>;
  }, [
    aiSuggestionState,
    handleEditDraftChange,
    onApplyEditSuggested,
    onCancelEditSuggested,
    onStartEditSuggested,
    suggestionDiffMarkdown,
  ]);

  return (
    <Modal
      title={title}
      open={!!aiSuggestionState}
      footer={null}
      onCancel={onClose}
      destroyOnClose
      width={1100}>
      {aiSuggestionState && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {nodeDirtyWarning && (
            <Alert
              type="warning"
              showIcon
              message="Unsaved changes for this node"
              description="AI suggestions use the current value from the database. Save this node first if you want your latest edits included."
            />
          )}

          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>
              Current instructions
            </Text>
            {currentContentSection}
          </div>

          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>
              Model
            </Text>
            <Select
              value={aiSuggestionState.model}
              onChange={handleModelChange}
              allowClear
              showSearch
              loading={litellmModelsLoading}
              notFoundContent={
                litellmModelsLoading
                  ? 'Loading models...'
                  : 'No models available'
              }
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={liteLlmModelOptions}
              disabled={aiSuggestionState.loading}
              placeholder="Select model"
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>
              What should be improved?
            </Text>
            <Input.TextArea
              value={aiSuggestionState.userRequest}
              onChange={handleUserRequestChange}
              placeholder="Describe what you want to change or add"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Button
                type="primary"
                onClick={onSubmit}
                loading={aiSuggestionState.loading}
                disabled={
                  !isGraphRunning ||
                  aiSuggestionState.loading ||
                  !aiSuggestionState.userRequest.trim() ||
                  !graphId ||
                  !nodeId
                }>
                Send
              </Button>
            </div>
          </div>

          {aiSuggestionState.suggestedInstructions && (
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Space>
                <Button onClick={onClose}>Close</Button>
                <Button type="primary" onClick={onApply}>
                  Apply to field
                </Button>
              </Space>
            </div>
          )}
        </Space>
      )}
    </Modal>
  );
};
