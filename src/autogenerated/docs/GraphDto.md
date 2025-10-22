# GraphDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**error** | **string** |  | [optional] [default to undefined]
**version** | **string** |  | [default to undefined]
**schema** | [**CreateGraphDtoSchema**](CreateGraphDtoSchema.md) |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**metadata** | [**CreateGraphDtoMetadata**](CreateGraphDtoMetadata.md) |  | [optional] [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**temporary** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { GraphDto } from './api';

const instance: GraphDto = {
    id,
    name,
    description,
    error,
    version,
    schema,
    status,
    metadata,
    createdAt,
    updatedAt,
    temporary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
