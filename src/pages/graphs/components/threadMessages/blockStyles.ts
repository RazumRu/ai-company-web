import type React from 'react';

/** Shared styles used by SubagentBlock and CommunicationBlock. */

export const HEADER_LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#434343',
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const INNER_AREA_STYLE: React.CSSProperties = {
  overflowX: 'hidden',
  padding: '8px 10px',
  backgroundColor: '#fafafa',
  borderRadius: 6,
  border: '1px solid #f0f0f0',
};

export const TAG_STYLE: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  lineHeight: '18px',
};

export const PARENT_CONTENT_STYLE: React.CSSProperties = {
  padding: '6px 10px',
  fontSize: 12,
  color: '#595959',
  backgroundColor: '#fafafa',
  borderRadius: 6,
  border: '1px solid #f0f0f0',
  lineHeight: 1.5,
};
