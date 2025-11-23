# UpdateGraphDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [optional] [default to undefined]
**description** | [**UpdateGraphDtoDescription**](UpdateGraphDtoDescription.md) |  | [optional] [default to undefined]
**schema** | [**UpdateGraphDtoSchema**](UpdateGraphDtoSchema.md) |  | [optional] [default to undefined]
**metadata** | [**UpdateGraphDtoMetadata**](UpdateGraphDtoMetadata.md) |  | [optional] [default to undefined]
**temporary** | [**UpdateGraphDtoTemporary**](UpdateGraphDtoTemporary.md) |  | [optional] [default to undefined]
**currentVersion** | **string** | Current version of the graph (for optimistic locking and 3-way merge base) | [default to undefined]

## Example

```typescript
import { UpdateGraphDto } from './api';

const instance: UpdateGraphDto = {
    name,
    description,
    schema,
    metadata,
    temporary,
    currentVersion,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
