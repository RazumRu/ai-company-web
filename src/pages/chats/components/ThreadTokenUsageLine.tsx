import { Popover, Space, Typography } from 'antd';
import React from 'react';

import type { ThreadTokenUsageSnapshot } from '../types';
import {
  clampPercent,
  formatCompactNumber,
  formatUsd,
} from '../utils/chatsPageUtils';
import { ContextUsageGauge } from './ContextUsageGauge';

const { Text } = Typography;

export const ThreadTokenUsageLine: React.FC<{
  usage?: ThreadTokenUsageSnapshot | null;
  withPopover?: boolean;
  contextMaxTokens?: number;
  contextPercent?: number;
}> = ({ usage, withPopover = false, contextMaxTokens, contextPercent }) => {
  const totalTokens = usage?.totalTokens;
  const totalPrice = usage?.totalPrice;
  const currentContext = usage?.currentContext;
  if (typeof totalTokens !== 'number') return null;

  const percent =
    typeof contextPercent === 'number'
      ? contextPercent
      : typeof currentContext === 'number' &&
          typeof contextMaxTokens === 'number' &&
          Number.isFinite(contextMaxTokens) &&
          contextMaxTokens > 0
        ? (currentContext / contextMaxTokens) * 100
        : undefined;

  const line = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}>
      <Text type="secondary" style={{ fontSize: 12, margin: 0 }}>
        Token usage: {formatCompactNumber(totalTokens)} ({formatUsd(totalPrice)}
        )
      </Text>
      {typeof percent === 'number' && <ContextUsageGauge percent={percent} />}
    </span>
  );

  if (!withPopover) return line;

  const popoverContent = (
    <Space direction="vertical" size={2} style={{ maxWidth: 340 }}>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Input tokens: {usage?.inputTokens ?? '—'}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Cached input tokens: {usage?.cachedInputTokens ?? '—'}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Output tokens: {usage?.outputTokens ?? '—'}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Reasoning tokens: {usage?.reasoningTokens ?? '—'}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Total tokens: {usage?.totalTokens ?? '—'}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Total cost: {formatUsd(usage?.totalPrice)}
      </Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        Current context: {usage?.currentContext ?? '—'}
      </Text>
      {typeof percent === 'number' && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          Context usage: {Math.round(clampPercent(percent))}%
          {typeof contextMaxTokens === 'number' &&
            Number.isFinite(contextMaxTokens) &&
            contextMaxTokens > 0 && (
              <> ({formatCompactNumber(contextMaxTokens)})</>
            )}
        </Text>
      )}
    </Space>
  );

  return (
    <Popover
      content={popoverContent}
      trigger={['hover']}
      placement="bottomLeft">
      <span style={{ display: 'inline-block' }}>{line}</span>
    </Popover>
  );
};
