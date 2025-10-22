import { Modal, Button, Space, Typography, message, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useState, useEffect } from 'react';
import type { GraphNode } from '../types';

const { Title } = Typography;

interface NodeEditModalProps {
  node: GraphNode | null;
  visible: boolean;
  onClose: () => void;
  onSave: (nodeId: string, newConfig: Record<string, any>) => void;
}

export const NodeEditModal = ({ node, visible, onClose, onSave }: NodeEditModalProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [form] = Form.useForm();

  useEffect(() => {
    if (node) {
      const config = node.data.config || {};
      setFormData(config);
      form.setFieldsValue(config);
    }
  }, [node, form]);

  interface ZodDef {
    type: string;
    innerType?: { def: { type: string } };
    defaultValue?: unknown;
    values?: unknown;
    options?: Array<{ def: { type: string } }>;
    element?: { def: { type: string } };
    keyType?: { def: { type: string } };
    valueType?: { def: { type: string } };
    shape?: Record<string, ZodType>;
  }

  interface ZodType {
    def: ZodDef;
    minLength?: number | null;
    maxLength?: number | null;
    minValue?: number | null;
    maxValue?: number | null;
    format?: string | null;
    isInt?: boolean;
    isFinite?: boolean;
  }

  interface FieldInfo {
    type: string;
    isOptional: boolean;
    isDefault: boolean;
    defaultValue?: unknown;
    def: ZodDef;
  }

  const getFieldInfo = (zodType: ZodType): FieldInfo => {
    const def = zodType.def;
    const isOptional = def.type === 'optional';
    const isDefault = def.type === 'default';
    
    let actualType = def.type;
    let defaultValue: unknown = undefined;
    
    if (isOptional) {
      actualType = def.innerType?.def?.type || 'unknown';
    } else if (isDefault) {
      actualType = def.innerType?.def?.type || 'unknown';
      defaultValue = def.defaultValue;
    }

    return { type: actualType, isOptional, isDefault, defaultValue, def };
  };

  const renderFormField = (key: string, zodType: ZodType) => {
    const fieldInfo = getFieldInfo(zodType);
    const { type, isOptional, defaultValue, def } = fieldInfo;
    
    const label = (
      <span>
        {key}
        {!isOptional && <span style={{ color: 'red' }}> *</span>}
        {isOptional && <span style={{ color: 'orange' }}> (optional)</span>}
        {defaultValue !== undefined && <span style={{ color: 'blue' }}> (default: {JSON.stringify(defaultValue)})</span>}
      </span>
    );

    switch (type) {
      case 'string':
        if (def.type === 'literal' && def.values) {
          return (
            <Form.Item key={key} name={key} label={label}>
              <Select placeholder={`Select ${key}`}>
                {Array.isArray(def.values) ? def.values.map((value: unknown) => (
                  <Select.Option key={String(value)} value={value}>{String(value)}</Select.Option>
                )) : (
                  <Select.Option key={String(def.values)} value={def.values}>{String(def.values)}</Select.Option>
                )}
              </Select>
            </Form.Item>
          );
        }
        if (zodType.maxLength && zodType.maxLength > 100) {
          return (
            <Form.Item key={key} name={key} label={label}>
              <Input.TextArea 
                rows={4} 
                placeholder={`Enter ${key}`}
                maxLength={zodType.maxLength}
                showCount
              />
            </Form.Item>
          );
        }
        return (
          <Form.Item key={key} name={key} label={label}>
            <Input placeholder={`Enter ${key}`} />
          </Form.Item>
        );
      
      case 'number':
        return (
          <Form.Item key={key} name={key} label={label}>
            <InputNumber 
              style={{ width: '100%' }}
              placeholder={`Enter ${key}`}
              min={zodType.minValue ?? undefined}
              max={zodType.maxValue ?? undefined}
            />
          </Form.Item>
        );
      
      case 'boolean':
        return (
          <Form.Item key={key} name={key} label={label} valuePropName="checked">
            <Switch />
          </Form.Item>
        );
      
      case 'array':
        return (
          <Form.Item key={key} name={key} label={label}>
            <Select mode="tags" placeholder={`Enter ${key} (press Enter to add)`} />
          </Form.Item>
        );
      
      default:
        return (
          <Form.Item key={key} name={key} label={label}>
            <Input placeholder={`Enter ${key}`} />
          </Form.Item>
        );
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (node) {
        onSave(node.id, values);
        onClose();
      }
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };

  if (!node) return null;

  const schema = (node.data as { templateSchema?: { schema?: { shape?: Record<string, ZodType> } } }).templateSchema?.schema;
  const shape = schema?.shape || {};

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          Edit Node: {String(node.data.label)}
        </Title>
      }
      open={visible}
      onCancel={onClose}
      width={600}
      footer={
        <Space>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Space>
      }
    >
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
        >
          {Object.entries(shape).map(([key, zodType]) =>
            renderFormField(key, zodType)
          )}
        </Form>
      </div>
    </Modal>
  );
};