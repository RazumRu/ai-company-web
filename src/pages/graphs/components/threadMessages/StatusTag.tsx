import { Tag } from 'antd';
import React from 'react';

import { TAG_STYLE } from './blockStyles';
import type { ToolRenderStatus } from './threadMessagesTypes';

interface StatusTagProps {
  status: ToolRenderStatus;
  hasError?: boolean;
}

/** Renders the small status tag (done / error / stopped / running)
 *  used by SubagentBlock and CommunicationBlock headers. */
export const StatusTag: React.FC<StatusTagProps> = ({ status, hasError }) => {
  if (status === 'executed' && !hasError) {
    return (
      <Tag color="success" style={TAG_STYLE}>
        done
      </Tag>
    );
  }
  if (status === 'executed' && hasError) {
    return (
      <Tag color="error" style={TAG_STYLE}>
        error
      </Tag>
    );
  }
  if (status === 'stopped') {
    return <Tag style={TAG_STYLE}>stopped</Tag>;
  }
  return (
    <Tag color="processing" style={TAG_STYLE}>
      running
    </Tag>
  );
};

StatusTag.displayName = 'StatusTag';
