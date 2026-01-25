import { Button, Input, Modal, Select, Space, Tag, Typography } from 'antd';
import { createTwoFilesPatch } from 'diff';
import { useMemo } from 'react';

import { MarkdownSplitEditor } from '../../../components/markdown/MarkdownSplitEditor';

const { Text } = Typography;

export type KnowledgeSuggestionState = {
  currentTitle: string;
  currentContent: string;
  currentTags: string[];
  suggestedTitle?: string;
  suggestedContent?: string;
  suggestedTags?: string[];
  isEditingSuggestion?: boolean;
  editSuggestionDraft?: string;
  userRequest: string;
  threadId?: string;
  model?: string;
  loading: boolean;
};

type KnowledgeAiSuggestionModalProps = {
  open: boolean;
  state: KnowledgeSuggestionState | null;
  models: { label: string; value: string }[];
  modelsLoading: boolean;
  onClose: () => void;
  onUserRequestChange: (value: string) => void;
  onModelChange: (value?: string) => void;
  onSubmit: () => void;
  onApplySuggestion: () => void;
  onStartEditSuggested: () => void;
  onCancelEditSuggested: () => void;
  onApplyEditSuggested: () => void;
  onEditDraftChange: (value: string) => void;
  onSuggestedTitleChange: (value: string) => void;
  onSuggestedTagsChange: (value: string[]) => void;
};

export const KnowledgeAiSuggestionModal = ({
  open,
  state,
  models,
  modelsLoading,
  onClose,
  onUserRequestChange,
  onModelChange,
  onSubmit,
  onApplySuggestion,
  onStartEditSuggested,
  onCancelEditSuggested,
  onApplyEditSuggested,
  onEditDraftChange,
  onSuggestedTitleChange,
  onSuggestedTagsChange,
}: KnowledgeAiSuggestionModalProps) => {
  const suggestionDiffMarkdown = useMemo(() => {
    if (!state?.suggestedContent) return null;
    const diffString = createTwoFilesPatch(
      'Current',
      'Suggested',
      state.currentContent ?? '',
      state.suggestedContent ?? '',
      '',
      '',
      { context: Number.MAX_SAFE_INTEGER },
    );
    const trimmed = diffString.trimEnd();
    return `\`\`\`diff\n${trimmed}\n\`\`\``;
  }, [state?.currentContent, state?.suggestedContent]);

  const hasAiSuggestion =
    Boolean(state?.suggestedTitle) ||
    Boolean(state?.suggestedContent) ||
    (state?.suggestedTags?.length ?? 0) > 0;

  if (!open || !state) {
    return null;
  }

  return (
    <Modal
      title="Improve knowledge with AI"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1000}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text strong style={{ display: 'block', marginBottom: 6 }}>
            Current knowledge
          </Text>
          <Space direction="vertical" size={6} style={{ width: '100%' }}>
            <Text>
              <Text type="secondary">Title:</Text>{' '}
              {state.currentTitle || 'Untitled'}
            </Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {state.currentTags.length > 0 ? (
                state.currentTags.map((tag) => (
                  <Tag key={tag} style={{ margin: 0 }}>
                    {tag}
                  </Tag>
                ))
              ) : (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  No tags
                </Text>
              )}
            </div>
          </Space>
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: 6 }}>
            Content preview
          </Text>
          {state.isEditingSuggestion ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <MarkdownSplitEditor
                value={
                  state.editSuggestionDraft ??
                  state.suggestedContent ??
                  state.currentContent
                }
                onChange={onEditDraftChange}
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
          ) : state.suggestedContent ? (
            <MarkdownSplitEditor
              value={suggestionDiffMarkdown ?? ''}
              readOnly
              height={360}
              initialMode="split"
              previewValue={state.suggestedContent}
              onModeChange={(nextMode) => {
                if (nextMode === 'edit') {
                  onStartEditSuggested();
                }
              }}
              shouldChangeMode={(nextMode) => nextMode !== 'edit'}
            />
          ) : (
            <MarkdownSplitEditor
              value={state.currentContent}
              readOnly
              height={300}
              initialMode="split"
            />
          )}
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: 6 }}>
            Model
          </Text>
          <Select
            value={state.model}
            onChange={(value) => onModelChange(value)}
            allowClear
            showSearch
            loading={modelsLoading}
            notFoundContent={
              modelsLoading ? 'Loading models...' : 'No models available'
            }
            filterOption={(input, option) =>
              (option?.label ?? '')
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={models}
            placeholder="Select model"
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <Text strong style={{ display: 'block', marginBottom: 6 }}>
            What should be improved?
          </Text>
          <Input.TextArea
            value={state.userRequest}
            onChange={(e) => onUserRequestChange(e.target.value)}
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
              loading={state.loading}
              disabled={state.loading || !state.userRequest.trim()}>
              Send
            </Button>
          </div>
        </div>

        {hasAiSuggestion && (
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>
              Suggested knowledge
            </Text>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <Input
                value={state.suggestedTitle ?? ''}
                placeholder="Suggested title"
                onChange={(e) => onSuggestedTitleChange(e.target.value)}
              />
              <Select
                mode="tags"
                placeholder="Suggested tags"
                value={state.suggestedTags ?? []}
                onChange={(nextTags) =>
                  onSuggestedTagsChange(nextTags as string[])
                }
                tokenSeparators={[',']}
              />
            </Space>
          </div>
        )}

        {hasAiSuggestion && (
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Space>
              <Button onClick={onClose}>Close</Button>
              <Button type="primary" onClick={onApplySuggestion}>
                Apply to form
              </Button>
            </Space>
          </div>
        )}
      </Space>
    </Modal>
  );
};
