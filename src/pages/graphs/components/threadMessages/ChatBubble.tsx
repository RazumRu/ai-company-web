import React from 'react';
import { Avatar } from 'antd';

interface ChatBubbleProps {
  isHuman: boolean;
  avatarLabel: string;
  avatarColor: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bubbleStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  isHuman,
  avatarLabel,
  avatarColor,
  children,
  footer,
  bubbleStyle,
  containerStyle,
}) => {
  const baseContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: isHuman ? 'flex-end' : 'flex-start',
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
  };

  const mergedContainer = { ...baseContainer, ...containerStyle };

  const baseBubbleStyle: React.CSSProperties = {
    backgroundColor: isHuman ? '#f0f8ff' : '#f3f3f3',
    borderRadius: '5px',
    padding: '8px 12px',
    wordBreak: 'break-word',
    minWidth: '100px',
    maxWidth: '100%',
    overflowX: 'auto',
  };

  const mergedBubbleStyle = { ...baseBubbleStyle, ...bubbleStyle };

  const ContentWrapper = (
    <div
      style={{
        maxWidth: '90%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isHuman ? 'flex-end' : 'flex-start',
      }}>
      <div style={mergedBubbleStyle}>{children}</div>
      {footer}
    </div>
  );

  return (
    <div style={mergedContainer}>
      {!isHuman && (
        <Avatar
          style={{ backgroundColor: avatarColor, flexShrink: 0 }}
          size="small">
          {avatarLabel}
        </Avatar>
      )}
      {ContentWrapper}
      {isHuman && (
        <Avatar
          style={{ backgroundColor: avatarColor, flexShrink: 0 }}
          size="small">
          {avatarLabel}
        </Avatar>
      )}
    </div>
  );
};
