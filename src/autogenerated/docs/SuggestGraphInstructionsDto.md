# SuggestGraphInstructionsDto

## Properties

| Name            | Type       | Description                                              | Notes                             |
| --------------- | ---------- | -------------------------------------------------------- | --------------------------------- |
| **userRequest** | **string** | User request describing how to adjust agent instructions | [default to undefined]            |
| **model**       | **string** | Optional LLM model to use for this suggestion            | [optional] [default to undefined] |

## Example

```typescript
import { SuggestGraphInstructionsDto } from './api';

const instance: SuggestGraphInstructionsDto = {
  userRequest,
  model,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
