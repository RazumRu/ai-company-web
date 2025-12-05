# GraphNodeWithStatusDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Node ID | [default to undefined]
**name** | **string** | Display name for node | [default to undefined]
**template** | **string** | Template identifier | [default to undefined]
**type** | **string** | Node kind | [default to undefined]
**status** | **string** | Current node status | [default to undefined]
**config** | **any** |  | [default to undefined]
**error** | **string** |  | [optional] [default to undefined]
**metadata** | [**GraphNodeWithStatusDtoMetadata**](GraphNodeWithStatusDtoMetadata.md) |  | [optional] [default to undefined]
**additionalNodeMetadata** | **{ [key: string]: any; }** | Additional metadata exposed by the node implementation | [optional] [default to undefined]

## Example

```typescript
import { GraphNodeWithStatusDto } from './api';

const instance: GraphNodeWithStatusDto = {
    id,
    name,
    template,
    type,
    status,
    config,
    error,
    metadata,
    additionalNodeMetadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
