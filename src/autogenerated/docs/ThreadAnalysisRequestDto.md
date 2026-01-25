# ThreadAnalysisRequestDto

## Properties

| Name          | Type       | Description                                                             | Notes                             |
| ------------- | ---------- | ----------------------------------------------------------------------- | --------------------------------- |
| **userInput** | **string** | Optional user-provided input to guide the analysis                      | [optional] [default to undefined] |
| **threadId**  | **string** | Optional LLM conversation id to continue the existing suggestion thread | [optional] [default to undefined] |
| **model**     | **string** | Optional LLM model to use for this analysis                             | [optional] [default to undefined] |

## Example

```typescript
import { ThreadAnalysisRequestDto } from './api';

const instance: ThreadAnalysisRequestDto = {
  userInput,
  threadId,
  model,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
