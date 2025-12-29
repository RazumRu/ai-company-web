# UpdateGraphResponseDtoRevision

## Properties

| Name             | Type                                                                                                               | Description                                                  | Notes                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------- |
| **id**           | **string**                                                                                                         |                                                              | [default to undefined]            |
| **graphId**      | **string**                                                                                                         |                                                              | [default to undefined]            |
| **baseVersion**  | **string**                                                                                                         | Version the client changes were based on                     | [default to undefined]            |
| **toVersion**    | **string**                                                                                                         | New head version after this revision                         | [default to undefined]            |
| **configDiff**   | [**Array&lt;UpdateGraphResponseDtoRevisionConfigDiffInner&gt;**](UpdateGraphResponseDtoRevisionConfigDiffInner.md) | JSON Patch (RFC 6902) operations between old and new schemas | [default to undefined]            |
| **clientConfig** | [**UpdateGraphResponseDtoRevisionClientConfig**](UpdateGraphResponseDtoRevisionClientConfig.md)                    |                                                              | [default to undefined]            |
| **newConfig**    | [**UpdateGraphResponseDtoRevisionNewConfig**](UpdateGraphResponseDtoRevisionNewConfig.md)                          |                                                              | [default to undefined]            |
| **status**       | **string**                                                                                                         |                                                              | [default to undefined]            |
| **error**        | **string**                                                                                                         |                                                              | [optional] [default to undefined] |
| **createdAt**    | **string**                                                                                                         |                                                              | [default to undefined]            |
| **updatedAt**    | **string**                                                                                                         |                                                              | [default to undefined]            |

## Example

```typescript
import { UpdateGraphResponseDtoRevision } from './api';

const instance: UpdateGraphResponseDtoRevision = {
  id,
  graphId,
  baseVersion,
  toVersion,
  configDiff,
  clientConfig,
  newConfig,
  status,
  error,
  createdAt,
  updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
