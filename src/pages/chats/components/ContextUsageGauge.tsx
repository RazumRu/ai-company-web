import React from 'react';

import { clampPercent, getPercentColor } from '../utils/chatsPageUtils';

export const ContextUsageGauge: React.FC<{
  percent: number;
  size?: number;
}> = ({ percent, size = 15 }) => {
  const safePercent = clampPercent(percent);
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - safePercent / 100);
  const color = getPercentColor(safePercent);
  const label = `${Math.round(safePercent)}%`;

  return (
    <span
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
      aria-label={`Context usage ${label}`}>
      <svg width={size} height={size} style={{ display: 'block' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d9d9d9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
    </span>
  );
};
