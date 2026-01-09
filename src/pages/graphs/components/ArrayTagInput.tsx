import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Input, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface ArrayTagInputProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export const ArrayTagInput: React.FC<ArrayTagInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Add item',
  disabled = false,
  readonly = false,
}) => {
  const [items, setItems] = useState<string[]>(value);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setItems(value);
  }, [value]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleRemove = (removedItem: string) => {
    const newItems = items.filter((item) => item !== removedItem);
    setItems(newItems);
    onChange?.(newItems);
  };

  const handleInputConfirm = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !items.includes(trimmedValue)) {
      const newItems = [...items, trimmedValue];
      setItems(newItems);
      onChange?.(newItems);
    }
    setInputValue('');
    setInputVisible(false);
    setIsFocused(false);
  };

  const showInput = () => {
    setInputVisible(true);
    setIsFocused(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '8px 12px',
        border: `1px solid ${isFocused ? '#4096ff' : disabled ? '#f0f0f0' : '#d9d9d9'}`,
        borderRadius: 6,
        backgroundColor: disabled ? '#f5f5f5' : '#fff',
        minHeight: 40,
        alignItems: 'flex-start',
        transition: 'all 0.2s',
        cursor: disabled || readonly ? 'not-allowed' : 'default',
        boxShadow: isFocused ? '0 0 0 2px rgba(5, 145, 255, 0.1)' : 'none',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !readonly && !isFocused) {
          e.currentTarget.style.borderColor = '#4096ff';
        }
      }}
      onMouseLeave={(e) => {
        if (!isFocused) {
          e.currentTarget.style.borderColor = '#d9d9d9';
        }
      }}>
      {items.map((item) => (
        <Tag
          key={item}
          closable={!disabled && !readonly}
          onClose={() => handleRemove(item)}
          style={{
            margin: 0,
            padding: '4px 10px',
            fontSize: 14,
            borderRadius: 4,
            lineHeight: '22px',
            height: 30,
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            backgroundColor: '#f0f0f0',
            border: '1px solid #d9d9d9',
          }}>
          {item}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 180,
            height: 30,
            fontSize: 14,
            border: 'none',
            boxShadow: 'none',
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => {
            handleInputConfirm();
            setIsFocused(false);
          }}
          onPressEnter={handleInputConfirm}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
        />
      ) : (
        !disabled &&
        !readonly && (
          <Tag
            onClick={showInput}
            style={{
              margin: 0,
              padding: '4px 10px',
              fontSize: 14,
              borderRadius: 4,
              lineHeight: '22px',
              height: 30,
              display: 'flex',
              alignItems: 'center',
              background: '#fafafa',
              borderStyle: 'dashed',
              borderColor: '#d9d9d9',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#4096ff';
              e.currentTarget.style.color = '#4096ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d9d9d9';
              e.currentTarget.style.color = 'inherit';
            }}>
            <PlusOutlined style={{ fontSize: 12, marginRight: 4 }} /> Add Item
          </Tag>
        )
      )}
    </div>
  );
};
