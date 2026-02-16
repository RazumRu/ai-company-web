import React from 'react';

import { MarkdownContent } from '../../../../components/markdown/MarkdownContent';

/** Reusable coloured section with an uppercase header label and markdown body.
 *  Used by SubagentBlock and CommunicationBlock for Task/Instruction, Error,
 *  and Result sections to avoid duplicating identical styled markup. */

interface StyledSectionTheme {
  background: string;
  border: string;
  labelColor: string;
  contentColor: string;
}

const THEMES: Record<string, StyledSectionTheme> = {
  task: {
    background: '#f0f5ff',
    border: '#adc6ff',
    labelColor: '#1d39c4',
    contentColor: '#000000',
  },
  instruction: {
    background: '#f9f0ff',
    border: '#d3adf7',
    labelColor: '#722ed1',
    contentColor: '#000000',
  },
  error: {
    background: '#fff2f0',
    border: '#ffccc7',
    labelColor: '#cf1322',
    contentColor: '#cf1322',
  },
  result: {
    background: '#f6ffed',
    border: '#b7eb8f',
    labelColor: '#389e0d',
    contentColor: '#135200',
  },
};

export type StyledSectionVariant = keyof typeof THEMES;

export interface StyledSectionProps {
  variant: StyledSectionVariant;
  label: string;
  content: string;
}

export const StyledSection: React.FC<StyledSectionProps> = ({
  variant,
  label,
  content,
}) => {
  const theme = THEMES[variant];

  return (
    <div
      style={{
        padding: '6px 10px',
        fontSize: 12,
        backgroundColor: theme.background,
        borderRadius: 6,
        border: `1px solid ${theme.border}`,
        lineHeight: 1.5,
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 6,
          paddingBottom: 6,
          borderBottom: `1px solid ${theme.border}`,
        }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.labelColor,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
          {label}
        </span>
      </div>
      <MarkdownContent
        content={content}
        style={{
          fontSize: '12px',
          lineHeight: '1.4',
          color: theme.contentColor,
        }}
      />
    </div>
  );
};

StyledSection.displayName = 'StyledSection';
