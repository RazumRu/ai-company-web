# AnalyticsOverviewDto

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

## Example

```typescript
import { AnalyticsOverviewDto } from './api';

const instance: AnalyticsOverviewDto = {
  totalThreads,
  inputTokens,
  cachedInputTokens,
  outputTokens,
  reasoningTokens,
  totalTokens,
  totalPrice,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
