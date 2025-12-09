# SuggestAgentInstructionsDto

## Properties

| Name            | Type       | Description                                                       | Notes                             |
| --------------- | ---------- | ----------------------------------------------------------------- | --------------------------------- |
| **userRequest** | **string** | User request describing how to adjust agent instructions          | [default to undefined]            |
| **threadId**    | **string** | Optional thread id to continue a previous suggestion conversation | [optional] [default to undefined] |

## Example

```typescript
import { SuggestAgentInstructionsDto } from './api';

const instance: SuggestAgentInstructionsDto = {
  userRequest,
  threadId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
