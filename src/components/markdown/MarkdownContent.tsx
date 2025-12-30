import React from 'react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

type MarkdownElementProps<T> = React.HTMLAttributes<T> & {
  children?: React.ReactNode;
};

type MarkdownCodeProps = React.HTMLAttributes<HTMLElement> & {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode[];
};

const renderMarkdownCode = ({
  inline,
  className,
  children,
}: MarkdownCodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children ?? '').replace(/\n$/, '');
  if (!inline && match && match[1] === 'diff') {
    const lines = codeContent.split('\n');
    return (
      <pre
        style={{
          margin: 0,
          padding: 12,
          borderRadius: 6,
          overflow: 'auto',
          background: '#1e1e1e',
          color: '#d4d4d4',
          fontSize: 12,
          lineHeight: 1.55,
        }}>
        <code>
          {lines.map((line, index) => {
            const isInsert = line.startsWith('+') && !line.startsWith('+++');
            const isDelete = line.startsWith('-') && !line.startsWith('---');
            const isHunk = line.startsWith('@@');
            const isHeader = line.startsWith('+++') || line.startsWith('---');

            const style: React.CSSProperties = {};
            if (isHeader) {
              style.color = '#9cdcfe';
            } else if (isHunk) {
              style.color = '#c586c0';
            } else if (isInsert) {
              style.background = 'rgba(46, 160, 67, 0.25)';
              style.color = '#b6f2c2';
            } else if (isDelete) {
              style.background = 'rgba(248, 81, 73, 0.25)';
              style.color = '#ffd2cc';
            }

            return (
              <div
                key={index}
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
                  whiteSpace: 'pre',
                  padding: '0 6px',
                  ...style,
                }}>
                {line.length === 0 ? '\u00A0' : line}
              </div>
            );
          })}
        </code>
      </pre>
    );
  }
  if (!inline && match) {
    return (
      <div
        style={{
          margin: '8px 0',
          borderRadius: 6,
          overflow: 'hidden',
        }}>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          codeTagProps={{ style: { fontSize: 12 } }}>
          {codeContent}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code
      className={className}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        padding: '0 4px',
        borderRadius: 4,
        fontSize: '12px',
      }}>
      {children}
    </code>
  );
};

const markdownComponents: Components = {
  p: ({ children }: MarkdownElementProps<HTMLParagraphElement>) => (
    <p
      style={{
        margin: 0,
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
      {children}
    </p>
  ),
  a: ({
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#1677ff' }}>
      {children}
    </a>
  ),
  ul: ({ children }: MarkdownElementProps<HTMLUListElement>) => (
    <ul style={{ margin: '0 0 8px 20px', padding: 0 }}>{children}</ul>
  ),
  ol: ({ children }: MarkdownElementProps<HTMLOListElement>) => (
    <ol style={{ margin: '0 0 8px 20px', padding: 0 }}>{children}</ol>
  ),
  li: ({ children }: MarkdownElementProps<HTMLLIElement>) => (
    <li style={{ marginBottom: 4, lineHeight: '1.5' }}>{children}</li>
  ),
  blockquote: ({ children }: MarkdownElementProps<HTMLQuoteElement>) => (
    <blockquote
      style={{
        margin: '0 0 8px',
        paddingLeft: 12,
        borderLeft: '3px solid #d9d9d9',
        color: '#595959',
      }}>
      {children}
    </blockquote>
  ),
  table: ({ children }: MarkdownElementProps<HTMLTableElement>) => (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        marginBottom: 12,
      }}>
      {children}
    </table>
  ),
  thead: ({ children }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <thead style={{ background: '#f5f5f5' }}>{children}</thead>
  ),
  tbody: ({ children }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <tbody>{children}</tbody>
  ),
  th: ({ children }: MarkdownElementProps<HTMLTableCellElement>) => (
    <th
      style={{
        border: '1px solid #d9d9d9',
        padding: '4px 8px',
        textAlign: 'left',
        fontWeight: 600,
      }}>
      {children}
    </th>
  ),
  td: ({ children }: MarkdownElementProps<HTMLTableCellElement>) => (
    <td
      style={{
        border: '1px solid #d9d9d9',
        padding: '4px 8px',
        verticalAlign: 'top',
      }}>
      {children}
    </td>
  ),
  code: renderMarkdownCode as Components['code'],
};

export interface MarkdownContentProps {
  content: string;
  style?: React.CSSProperties;
  className?: string;
  allowHorizontalScroll?: boolean;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
  style,
  className,
  allowHorizontalScroll = true,
}) => {
  if (!content || content.trim().length === 0) {
    return null;
  }

  const combinedStyle: React.CSSProperties = {
    maxWidth: '100%',
    overflowX: allowHorizontalScroll ? 'auto' : 'hidden',
    wordBreak: 'break-word',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    ...style,
  };

  return (
    <div style={combinedStyle} className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
};
