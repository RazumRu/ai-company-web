import { Typography } from 'antd';
import React from 'react';

/**
 * Shared component overrides for ReactMarkdown.
 * Used by instruction modals, AI suggestion modals, etc.
 */
export const simpleMarkdownComponents = {
  p: (props: React.ComponentProps<'p'>) => (
    <Typography.Paragraph style={{ marginBottom: 8 }} {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul style={{ paddingLeft: 20, marginBottom: 8 }} {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol style={{ paddingLeft: 20, marginBottom: 8 }} {...props} />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <Typography.Text
      code
      style={{
        background: '#f5f5f5',
        padding: '2px 4px',
        borderRadius: 4,
        fontSize: 12,
      }}
      {...props}
    />
  ),
};
