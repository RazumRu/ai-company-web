# GraphRevisionDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**graphId** | **string** |  | [default to undefined]
**fromVersion** | **string** |  | [default to undefined]
**toVersion** | **string** |  | [default to undefined]
**configurationDiff** | [**Array&lt;GraphRevisionDtoConfigurationDiffInner&gt;**](GraphRevisionDtoConfigurationDiffInner.md) | JSON Patch (RFC 6902) operations between old and new schemas | [default to undefined]
**newSchema** | [**CreateGraphDtoSchema**](CreateGraphDtoSchema.md) |  | [default to undefined]
**status** | **string** |  | [default to undefined]
**error** | **string** |  | [optional] [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]

## Example

```typescript
import { GraphRevisionDto } from './api';

const instance: GraphRevisionDto = {
    id,
    graphId,
    fromVersion,
    toVersion,
    configurationDiff,
    newSchema,
    status,
    error,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
