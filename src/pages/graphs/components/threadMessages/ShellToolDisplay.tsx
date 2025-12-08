import React, { useMemo, useState } from 'react';
import { Popover, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface ShellToolDisplayProps {
  name: string;
  status: 'calling' | 'executed';
  resultContent?: unknown;
  shellCommand?: string;
  toolOptions?: Record<string, JsonValue>;
  metadata?: { nodeId?: string; createdAt?: string; roleLabel?: string };
}

const parseJsonSafe = (value: string): JsonValue | null => {
  try {
    return JSON.parse(value) as JsonValue;
  } catch {
    return null;
  }
};

const renderToolPopoverContent = (
  value: unknown,
  toolOptions?: Record<string, JsonValue>,
): React.ReactNode => {
  let parsed: JsonValue | null = null;
  if (typeof value === 'string') {
    parsed = parseJsonSafe(value);
  } else if (value && typeof value === 'object' && !Array.isArray(value)) {
    parsed = value as JsonValue;
  }

  const containerStyle: React.CSSProperties = { maxWidth: 520 };
  const innerStyle: React.CSSProperties = {
    maxHeight: 300,
    overflow: 'auto',
    background: '#f5f5f5',
    border: '1px solid #eee',
    borderRadius: 6,
    padding: 12,
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: 12,
    whiteSpace: 'pre-wrap',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: 16,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 8,
    color: '#333',
    borderBottom: '1px solid #ddd',
    paddingBottom: 4,
  };

  return (
    <div style={containerStyle}>
      {toolOptions && Object.keys(toolOptions).length > 0 && (
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Tool Options:</div>
          <div style={innerStyle}>
            <JsonView value={toolOptions} style={lightTheme} />
          </div>
        </div>
      )}

      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Output:</div>
        <div style={innerStyle}>
          {parsed ? (
            <JsonView value={parsed as object} style={lightTheme} />
          ) : (
            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
              {String(value ?? '')}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

const truncateToLines = (
  text: string,
  maxLines: number,
): { truncated: string; full: string; isTruncated: boolean } => {
  const lines = text.split('\n');
  const isTruncated = lines.length > maxLines;
  const truncated = lines.slice(0, maxLines).join('\n');
  return { truncated, full: text, isTruncated };
};

export const ShellToolDisplay: React.FC<ShellToolDisplayProps> = ({
  name,
  status,
  resultContent,
  shellCommand,
  toolOptions,
}) => {
  const [commandExpanded, setCommandExpanded] = useState(false);
  const [outputExpanded, setOutputExpanded] = useState(false);

  const resultObj =
    typeof resultContent === 'object' &&
    resultContent !== null &&
    !Array.isArray(resultContent)
      ? (resultContent as Record<string, unknown>)
      : null;
  const stdoutText =
    resultObj && typeof resultObj.stdout === 'string' ? resultObj.stdout : null;
  const stderrText =
    resultObj && typeof resultObj.stderr === 'string' ? resultObj.stderr : null;
  const rawStringResult =
    typeof resultContent === 'string' ? resultContent : null;
  const outputFieldText =
    resultObj && typeof resultObj.output === 'string' ? resultObj.output : null;
  const exitCode =
    typeof resultObj?.exitCode === 'number'
      ? (resultObj.exitCode as number)
      : null;
  const exitCodeColor =
    exitCode === null || exitCode === 0 ? '#9d9d9d' : '#ff4d4f';
  const tint =
    exitCode === null ? '#2b2b2b' : exitCode === 0 ? '#1d2b1f' : '#2b1d1d';

  const toolNameText = useMemo(
    () =>
      `${name}${toolOptions?.purpose ? ` | ${String(toolOptions.purpose)}` : ''}`,
    [name, toolOptions?.purpose],
  );

  const getOutputText = (): string | null => {
    if (outputFieldText) return outputFieldText;
    if (rawStringResult) return rawStringResult;
    if (resultObj && typeof resultObj === 'object') {
      const displayText =
        resultObj.output || resultObj.stdout || resultObj.stderr;
      if (typeof displayText === 'string') {
        return displayText;
      }
    }
    return null;
  };

  const outputText = getOutputText();
  const commandTruncated = shellCommand
    ? truncateToLines(shellCommand, 3)
    : undefined;
  const stdoutTruncated = stdoutText
    ? truncateToLines(stdoutText, 3)
    : undefined;
  const stderrTruncated = stderrText
    ? truncateToLines(stderrText, 3)
    : undefined;
  const fallbackOutputTruncated =
    !stdoutText && !stderrText && outputText
      ? truncateToLines(outputText, 3)
      : undefined;
  const isAnyOutputTruncated =
    stdoutTruncated?.isTruncated ||
    stderrTruncated?.isTruncated ||
    fallbackOutputTruncated?.isTruncated;

  const outputTextForCopy = useMemo(
    () =>
      [
        stdoutText ? `STDOUT:\n${stdoutText}` : null,
        stderrText ? `STDERR:\n${stderrText}` : null,
        !stdoutText && !stderrText && outputText ? outputText : null,
      ]
        .filter(Boolean)
        .join('\n\n'),
    [outputText, stderrText, stdoutText],
  );

  const renderOutputBlock = (
    label: string,
    text: string,
    color: string,
    truncatedInfo?: ReturnType<typeof truncateToLines>,
  ) => (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 4,
        }}>
        <span
          style={{
            fontSize: '11px',
            color: '#c4c4c4',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
          {label}
        </span>
      </div>
      <SyntaxHighlighter
        language="bash"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: 0,
          background: 'transparent',
          fontSize: '12px',
        }}
        PreTag="div"
        codeTagProps={{
          style: { fontFamily: 'inherit', color },
        }}>
        {outputExpanded || !truncatedInfo?.isTruncated
          ? text
          : (truncatedInfo?.truncated ?? text)}
      </SyntaxHighlighter>
    </div>
  );

  return (
    <div>
      <div
        style={{
          background: '#1e1e1e',
          borderRadius: 6,
          border: '1px solid #333',
          color: '#e8e8e8',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace',
          fontSize: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)',
          backgroundImage: `linear-gradient(${tint}, ${tint})`,
          backgroundBlendMode: 'soft-light',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            padding: '5px 10px',
            background: '#1a1a1a',
          }}>
          {status === 'executed' && resultContent !== undefined ? (
            <Popover
              content={renderToolPopoverContent(resultContent, toolOptions)}
              trigger={['click']}
              placement="topLeft">
              <div
                style={{
                  cursor:
                    status === 'executed' && resultContent !== undefined
                      ? 'pointer'
                      : 'default',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                aria-label={
                  status === 'executed'
                    ? `View shell result for ${name}`
                    : `Shell ${name} is calling`
                }
                title={toolNameText}>
                {toolNameText}
              </div>
            </Popover>
          ) : (
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={toolNameText}>
              {toolNameText}
            </div>
          )}

          {status === 'calling' ? (
            <span style={{ color: '#c4c4c4' }}>executing…</span>
          ) : (
            <span
              style={{
                color: exitCodeColor,
                whiteSpace: 'nowrap',
                fontSize: '11px',
              }}>
              executed{exitCode !== null ? ` | exit ${exitCode}` : ''}
            </span>
          )}
        </div>

        {shellCommand && (
          <div style={{ padding: '5px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span
                style={{
                  color: '#a0a0a0',
                  paddingRight: '10px',
                  flexShrink: 0,
                }}>
                $
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    maxHeight:
                      commandExpanded || !commandTruncated?.isTruncated
                        ? 'none'
                        : '4.5em',
                    overflow:
                      commandExpanded || !commandTruncated?.isTruncated
                        ? 'visible'
                        : 'hidden',
                    position: 'relative',
                  }}>
                  <SyntaxHighlighter
                    language="bash"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: '12px',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: '1.5',
                    }}
                    PreTag="div"
                    codeTagProps={{
                      style: {
                        fontFamily: 'inherit',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                        padding: 0,
                        lineHeight: '1.5',
                      },
                    }}>
                    {shellCommand}
                  </SyntaxHighlighter>
                  {commandTruncated?.isTruncated && !commandExpanded && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1.5em',
                        background:
                          'linear-gradient(to bottom, transparent, #1e1e1e)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>
                {commandTruncated?.isTruncated && (
                  <div
                    style={{
                      color: '#1890ff',
                      cursor: 'pointer',
                      fontSize: '11px',
                      marginTop: '4px',
                      textDecoration: 'underline',
                    }}
                    onClick={() => setCommandExpanded(!commandExpanded)}>
                    {commandExpanded ? 'Show less' : 'Show more...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {status === 'executed' && (stdoutText || stderrText || outputText) && (
          <div
            style={{
              borderTop: '1px solid #333',
            }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 10px',
                borderBottom: '1px solid #333',
                background: '#1a1a1a',
              }}>
              <span style={{ fontSize: '11px', color: '#c4c4c4' }}>Output</span>
              <CopyOutlined
                style={{
                  color: '#c4c4c4',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onClick={async () => {
                  if (!outputTextForCopy) {
                    message.warning('No output to copy');
                    return;
                  }
                  try {
                    await navigator.clipboard.writeText(outputTextForCopy);
                    message.success('Copied to clipboard');
                  } catch (err) {
                    message.error('Failed to copy to clipboard');
                  }
                }}
              />
            </div>
            <div
              style={{
                padding: '5px 10px',
                maxHeight: outputExpanded ? '200px' : 'none',
                overflowY: outputExpanded ? 'scroll' : 'visible',
                overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: '#555 #2a2a2a',
              }}
              className="shell-output-container">
              {stdoutText &&
                renderOutputBlock(
                  'stdout',
                  stdoutText,
                  '#e8e8e8',
                  stdoutTruncated,
                )}
              {stderrText &&
                renderOutputBlock(
                  'stderr',
                  stderrText,
                  '#ff7875',
                  stderrTruncated,
                )}
              {!stdoutText &&
                !stderrText &&
                outputText &&
                renderOutputBlock(
                  'output',
                  outputText,
                  '#e8e8e8',
                  fallbackOutputTruncated,
                )}
              {isAnyOutputTruncated && (
                <div
                  style={{
                    color: '#1890ff',
                    cursor: 'pointer',
                    fontSize: '11px',
                    marginTop: '4px',
                    textDecoration: 'underline',
                  }}
                  onClick={() => setOutputExpanded(!outputExpanded)}>
                  {outputExpanded ? 'Show less' : 'Show more...'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
