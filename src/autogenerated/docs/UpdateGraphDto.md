# UpdateGraphDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**version** | **string** |  | [optional] [default to undefined]
**schema** | [**CreateGraphDtoSchema**](CreateGraphDtoSchema.md) |  | [optional] [default to undefined]
**metadata** | [**CreateGraphDtoMetadata**](CreateGraphDtoMetadata.md) |  | [optional] [default to undefined]
**temporary** | **boolean** |  | [optional] [default to false]

## Example

```typescript
import { UpdateGraphDto } from './api';

const instance: UpdateGraphDto = {
    name,
    description,
    version,
    schema,
    metadata,
    temporary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
