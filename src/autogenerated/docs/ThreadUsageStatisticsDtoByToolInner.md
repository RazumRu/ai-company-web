# ThreadUsageStatisticsDtoByToolInner

## Properties

| Name            | Type       | Description                          | Notes                             |
| --------------- | ---------- | ------------------------------------ | --------------------------------- |
| **toolName**    | **string** | Tool name                            | [default to undefined]            |
| **totalTokens** | **number** | Total tokens used by this tool       | [default to undefined]            |
| **totalPrice**  | **number** | Total price for this tool in USD     | [optional] [default to undefined] |
| **callCount**   | **number** | Number of times this tool was called | [default to undefined]            |

## Example

```typescript
import { ThreadUsageStatisticsDtoByToolInner } from './api';

const instance: ThreadUsageStatisticsDtoByToolInner = {
  toolName,
  totalTokens,
  totalPrice,
  callCount,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
