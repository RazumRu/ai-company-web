# CreateGraphDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**version** | **string** |  | [default to undefined]
**schema** | [**CreateGraphDtoSchema**](CreateGraphDtoSchema.md) |  | [default to undefined]
**metadata** | [**CreateGraphDtoMetadata**](CreateGraphDtoMetadata.md) |  | [optional] [default to undefined]
**temporary** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { CreateGraphDto } from './api';

const instance: CreateGraphDto = {
    name,
    description,
    version,
    schema,
    metadata,
    temporary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
