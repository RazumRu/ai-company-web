import { LoadingOutlined } from '@ant-design/icons';
import { Tag, Typography } from 'antd';
import React, { useMemo } from 'react';

import type {
  PreparedMessage,
  SubagentStatistics,
} from './threadMessagesTypes';
import {
  formatRequestTokenCount,
  formatRequestUsdShort,
} from './threadMessagesViewUtils';

const { Text } = Typography;

const HEADER_LABEL_STYLE: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: '#434343',
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const INNER_AREA_STYLE: React.CSSProperties = {
  overflowX: 'hidden',
  padding: '8px 10px',
  backgroundColor: '#fafafa',
  borderRadius: 6,
  border: '1px solid #f0f0f0',
};

const RESULT_PREVIEW_STYLE: React.CSSProperties = {
  padding: '8px 10px',
  fontSize: 12,
  color: '#333',
  whiteSpace: 'pre-wrap',
  maxHeight: 100,
  overflow: 'hidden',
  backgroundColor: '#fafafa',
  borderRadius: 6,
  border: '1px solid #f0f0f0',
};

const FOOTER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  paddingTop: 4,
  fontSize: 11,
  color: '#8c8c8c',
};

export interface SubagentBlockProps {
  purpose?: string;
  taskDescription?: string;
  agentId?: string;
  model?: string;
  status: 'calling' | 'executed' | 'stopped';
  innerMessages: PreparedMessage[];
  statistics?: SubagentStatistics;
  resultText?: string;
  errorText?: string;
  renderItem: (item: PreparedMessage, index: number) => React.ReactNode;
}

export const SubagentBlock: React.FC<SubagentBlockProps> = ({
  purpose,
  taskDescription,
  model,
  status,
  innerMessages,
  statistics,
  resultText,
  errorText,
  renderItem,
}) => {
  const isCalling = status === 'calling';

  const headerLabel = useMemo(
    () => (purpose ? `Subagent: ${purpose}` : 'Subagent'),
    [purpose],
  );

  const TAG_STYLE: React.CSSProperties = {
    margin: 0,
    fontSize: 11,
    lineHeight: '18px',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: '100%',
      }}>
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
        {isCalling && (
          <LoadingOutlined style={{ fontSize: 11, color: '#595959' }} />
        )}
        <Text style={HEADER_LABEL_STYLE}>{headerLabel}</Text>
        {status === 'executed' && !errorText && (
          <Tag color="success" style={TAG_STYLE}>
            done
          </Tag>
        )}
        {status === 'executed' && errorText && (
          <Tag color="error" style={TAG_STYLE}>
            error
          </Tag>
        )}
        {status === 'stopped' && <Tag style={TAG_STYLE}>stopped</Tag>}
        {status === 'calling' && (
          <Tag color="processing" style={TAG_STYLE}>
            running
          </Tag>
        )}
      </div>

      {/* Task description */}
      {taskDescription && (
        <div
          style={{
            padding: '6px 10px',
            fontSize: 12,
            color: '#595959',
            backgroundColor: '#fafafa',
            borderRadius: 6,
            border: '1px solid #f0f0f0',
            whiteSpace: 'pre-wrap',
            lineHeight: 1.5,
          }}>
          {taskDescription}
        </div>
      )}

      {/* Inner messages area */}
      <div style={INNER_AREA_STYLE}>
        {innerMessages.length === 0 && isCalling && (
          <Text type="secondary" style={{ fontSize: 12, fontStyle: 'italic' }}>
            Subagent is working...
          </Text>
        )}
        {innerMessages.map((item, idx) => (
          <div key={item.id || idx} style={{ marginBottom: 6 }}>
            {renderItem(item, idx)}
          </div>
        ))}
      </div>

      {/* Error */}
      {errorText && (
        <div
          style={{
            ...RESULT_PREVIEW_STYLE,
            color: '#cf1322',
            backgroundColor: '#fff2f0',
            border: '1px solid #ffccc7',
          }}>
          {errorText}
        </div>
      )}

      {/* Result */}
      {resultText && !errorText && (
        <div style={RESULT_PREVIEW_STYLE}>{resultText}</div>
      )}

      {/* Statistics footer */}
      <StatisticsFooter statistics={statistics} model={model} />
    </div>
  );
};

const StatisticsFooter: React.FC<{
  statistics?: SubagentStatistics;
  model?: string;
}> = ({ statistics, model }) => {
  if (!statistics && !model) return null;

  const items: { label: string; value: string }[] = [];

  if (statistics?.usage?.totalTokens) {
    items.push({
      label: 'Tokens',
      value: formatRequestTokenCount(statistics.usage.totalTokens),
    });
  }
  const totalPrice = statistics?.usage?.totalPrice ?? statistics?.totalPrice;
  if (typeof totalPrice === 'number' && totalPrice > 0) {
    items.push({
      label: 'Cost',
      value: formatRequestUsdShort(totalPrice),
    });
  }
  if (typeof statistics?.toolCallsMade === 'number') {
    items.push({ label: 'Tools', value: String(statistics.toolCallsMade) });
  }
  if (model) {
    items.push({ label: 'Model', value: model });
  }

  if (items.length === 0) return null;

  return (
    <div style={FOOTER_STYLE}>
      {items.map((item) => (
        <span key={item.label}>
          <Text type="secondary" style={{ fontSize: 11, fontWeight: 600 }}>
            {item.label}:
          </Text>{' '}
          <Text type="secondary" style={{ fontSize: 11 }}>
            {item.value}
          </Text>
        </span>
      ))}
    </div>
  );
};

SubagentBlock.displayName = 'SubagentBlock';
