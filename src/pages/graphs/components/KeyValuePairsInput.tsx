import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Input, Space } from 'antd';
import React, { useState } from 'react';

import type { KeyValuePair } from '../types';

interface KeyValuePairsInputProps {
  value?: KeyValuePair[];
  onChange?: (value: KeyValuePair[]) => void;
}

export const KeyValuePairsInput: React.FC<KeyValuePairsInputProps> = ({
  value,
  onChange,
}) => {
  const [localPairs, setLocalPairs] = useState<KeyValuePair[]>(value || []);
  const pairs = value ?? localPairs;
  const updatePairs = (newPairs: KeyValuePair[]) => {
    setLocalPairs(newPairs);
    onChange?.(newPairs);
  };

  const addPair = () => {
    updatePairs([...pairs, { key: '', value: '' }]);
  };

  const removePair = (index: number) => {
    updatePairs(pairs.filter((_, i) => i !== index));
  };

  const updatePair = (
    index: number,
    field: 'key' | 'value',
    newValue: string,
  ) => {
    updatePairs(
      pairs.map((pair, i) =>
        i === index ? { ...pair, [field]: newValue } : pair,
      ),
    );
  };

  return (
    <div>
      {pairs.map((pair, index) => (
        <Card
          key={index}
          size="small"
          style={{
            marginBottom: 8,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
          }}
          styles={{ body: { padding: 8 } }}>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="Key"
              value={pair.key}
              onChange={(e) => updatePair(index, 'key', e.target.value)}
              style={{ flex: 1 }}
            />
            <Input
              placeholder="Value"
              value={pair.value}
              onChange={(e) => updatePair(index, 'value', e.target.value)}
              style={{ flex: 1 }}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removePair(index)}
            />
          </Space.Compact>
        </Card>
      ))}
      <Button
        type="dashed"
        onClick={addPair}
        icon={<PlusOutlined />}
        style={{
          width: '100%',
          borderStyle: 'dashed',
          borderColor: '#d9d9d9',
          color: '#666',
        }}
        size="middle">
        Add Key-Value Pair
      </Button>
    </div>
  );
};
