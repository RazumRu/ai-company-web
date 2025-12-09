# GraphRevisionDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**graphId** | **string** |  | [default to undefined]
**baseVersion** | **string** | Version the client changes were based on | [default to undefined]
**toVersion** | **string** | New head version after this revision | [default to undefined]
**configurationDiff** | [**Array&lt;UpdateGraphResponseDtoRevisionConfigurationDiffInner&gt;**](UpdateGraphResponseDtoRevisionConfigurationDiffInner.md) | JSON Patch (RFC 6902) operations between old and new schemas | [default to undefined]
**clientSchema** | [**UpdateGraphResponseDtoRevisionClientSchema**](UpdateGraphResponseDtoRevisionClientSchema.md) |  | [default to undefined]
**newSchema** | [**UpdateGraphResponseDtoRevisionNewSchema**](UpdateGraphResponseDtoRevisionNewSchema.md) |  | [default to undefined]
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
    baseVersion,
    toVersion,
    configurationDiff,
    clientSchema,
    newSchema,
    status,
    error,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
