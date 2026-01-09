import { Input, Typography } from 'antd';
import React, { useMemo, useState } from 'react';

import { DiffHtmlView } from './DiffHtmlView';
import { MarkdownContent } from './MarkdownContent';

export type MarkdownSplitEditorMode = 'split' | 'edit' | 'preview';

export interface MarkdownSplitEditorProps {
  value: string;
  onChange?: (nextValue: string) => void;
  readOnly?: boolean;
  /**
   * When provided, preview renders this content instead of `value`.
   * Useful for "diff on the left, result on the right" compare mode.
   */
  previewValue?: string;
  height?: number;
  placeholder?: string;
  initialMode?: MarkdownSplitEditorMode;
  editorFontFamily?: string;
  onModeChange?: (nextMode: MarkdownSplitEditorMode) => void;
  shouldChangeMode?: (
    nextMode: MarkdownSplitEditorMode,
    currentMode: MarkdownSplitEditorMode,
  ) => boolean;
}

const { Text } = Typography;

const MODE_LABELS: Record<MarkdownSplitEditorMode, string> = {
  split: 'Split',
  edit: 'Edit',
  preview: 'Preview',
};

const normalizeMode = (value: unknown): MarkdownSplitEditorMode => {
  if (value === 'edit' || value === 'preview' || value === 'split') {
    return value;
  }
  return 'split';
};

export const MarkdownSplitEditor: React.FC<MarkdownSplitEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  previewValue,
  height = 420,
  placeholder,
  initialMode = 'split',
  editorFontFamily = 'monospace',
  onModeChange,
  shouldChangeMode,
}) => {
  const [mode, setMode] = useState<MarkdownSplitEditorMode>(() =>
    normalizeMode(initialMode),
  );

  const containerHeight = `${height}px`;
  const previewContent = useMemo(
    () => previewValue ?? value ?? '',
    [previewValue, value],
  );

  const fencedDiff = useMemo(() => {
    const raw = value ?? '';
    const match = raw.match(
      /^```(?:diff|patch|gitdiff|unidiff)\n([\s\S]*?)\n```\s*$/i,
    );
    return match?.[1] ?? null;
  }, [value]);

  const handleChange = (nextValue: string) => {
    if (readOnly) return;
    onChange?.(nextValue);
  };

  const tabBar = (
    <div
      role="tablist"
      aria-label="Markdown editor mode"
      style={{
        background: '#f2f2f7',
        borderRadius: 999,
        padding: 4,
        display: 'flex',
        gap: 6,
        width: 'fit-content',
        flexShrink: 0,
      }}>
      {(Object.keys(MODE_LABELS) as MarkdownSplitEditorMode[]).map((key) => {
        const isActive = mode === key;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              const shouldSwitch = shouldChangeMode
                ? shouldChangeMode(key, mode)
                : true;
              if (shouldSwitch) {
                setMode(key);
              }
              onModeChange?.(key);
            }}
            style={{
              border: 'none',
              background: isActive ? '#ffffff' : 'transparent',
              padding: '4px 10px',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13,
              color: isActive ? '#111' : '#555',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
            {MODE_LABELS[key]}
          </button>
        );
      })}
    </div>
  );

  const editor = readOnly ? (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
        border: '1px solid #f0f0f0',
        borderRadius: 6,
        padding: fencedDiff ? 0 : 12,
        background: '#fff',
      }}>
      {value.trim().length > 0 ? (
        fencedDiff ? (
          <DiffHtmlView diff={fencedDiff} />
        ) : (
          <MarkdownContent content={value} />
        )
      ) : (
        <Text type="secondary">Nothing to display.</Text>
      )}
    </div>
  ) : (
    <Input.TextArea
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      readOnly={readOnly}
      rows={10}
      placeholder={placeholder}
      style={{
        height: '100%',
        resize: 'none',
        fontFamily: editorFontFamily,
      }}
    />
  );

  const preview = (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
        border: '1px solid #f0f0f0',
        borderRadius: 6,
        padding: 12,
        background: '#fff',
      }}>
      {previewContent.trim().length > 0 ? (
        <MarkdownContent content={previewContent} />
      ) : (
        <Text type="secondary">Nothing to preview.</Text>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: 12,
        }}>
        <div />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {tabBar}
        </div>
      </div>

      <div style={{ height: containerHeight, minHeight: 0 }}>
        {mode === 'split' ? (
          <div style={{ display: 'flex', gap: 12, height: '100%' }}>
            <div style={{ flex: 1, minWidth: 0 }}>{editor}</div>
            <div style={{ flex: 1, minWidth: 0 }}>{preview}</div>
          </div>
        ) : mode === 'edit' ? (
          editor
        ) : (
          preview
        )}
      </div>
    </div>
  );
};
