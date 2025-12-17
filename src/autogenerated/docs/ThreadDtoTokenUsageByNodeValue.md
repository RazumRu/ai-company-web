# ThreadDtoTokenUsageByNodeValue

## Properties

| Name                  | Type       | Description         | Notes                             |
| --------------------- | ---------- | ------------------- | --------------------------------- |
| **inputTokens**       | **number** | Input tokens        | [default to undefined]            |
| **cachedInputTokens** | **number** | Cached input tokens | [optional] [default to undefined] |
| **outputTokens**      | **number** | Output tokens       | [default to undefined]            |
| **reasoningTokens**   | **number** | Reasoning tokens    | [optional] [default to undefined] |
| **totalTokens**       | **number** | Total tokens        | [default to undefined]            |
| **totalPrice**        | **number** | Total price in USD  | [optional] [default to undefined] |

## Example

```typescript
import { ThreadDtoTokenUsageByNodeValue } from './api';

const instance: ThreadDtoTokenUsageByNodeValue = {
  inputTokens,
  cachedInputTokens,
  outputTokens,
  reasoningTokens,
  totalTokens,
  totalPrice,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
