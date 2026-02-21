# AnalyticsByGraphResponseDtoGraphsInner

## Properties

| Name                  | Type       | Description                | Notes                  |
| --------------------- | ---------- | -------------------------- | ---------------------- |
| **totalThreads**      | **number** | Total number of threads    | [default to undefined] |
| **inputTokens**       | **number** | Sum of input tokens        | [default to undefined] |
| **cachedInputTokens** | **number** | Sum of cached input tokens | [default to undefined] |
| **outputTokens**      | **number** | Sum of output tokens       | [default to undefined] |
| **reasoningTokens**   | **number** | Sum of reasoning tokens    | [default to undefined] |
| **totalTokens**       | **number** | Sum of all tokens          | [default to undefined] |
| **totalPrice**        | **number** | Total cost in USD          | [default to undefined] |
| **graphId**           | **string** | Graph ID                   | [default to undefined] |
| **graphName**         | **string** | Graph name                 | [default to undefined] |

## Example

```typescript
import { AnalyticsByGraphResponseDtoGraphsInner } from './api';

const instance: AnalyticsByGraphResponseDtoGraphsInner = {
  totalThreads,
  inputTokens,
  cachedInputTokens,
  outputTokens,
  reasoningTokens,
  totalTokens,
  totalPrice,
  graphId,
  graphName,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
