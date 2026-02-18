import type React from 'react';

/** Shared styles used by SubagentBlock and CommunicationBlock. */

export const THINKING_STYLE: React.CSSProperties = {
  fontSize: 11,
  fontStyle: 'italic',
  color: '#8c8c8c',
  paddingTop: 2,
  animation: 'messages-tab-thinking-pulse 1.6s ease-in-out infinite',
};

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

/** Row that places the StatisticsFooter and the "thinking…" indicator on a
 *  single line.  Used by both SubagentBlock and CommunicationBlock. */
export const FOOTER_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 10,
};

/** Clickable "Show more / Collapse" toggle used by SubagentBlock,
 *  CommunicationBlock and StyledSection. */
export const EXPAND_TOGGLE_STYLE: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 4,
  cursor: 'pointer',
  fontSize: 11,
  color: '#8c8c8c',
  userSelect: 'none',
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
