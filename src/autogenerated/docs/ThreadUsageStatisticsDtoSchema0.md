# ThreadUsageStatisticsDtoSchema0

## Properties

| Name            | Type                                                                                   | Description                                                            | Notes                             |
| --------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| **toolName**    | **string**                                                                             | Tool name                                                              | [default to undefined]            |
| **totalTokens** | **number**                                                                             | Total tokens from LLM requests related to this tool                    | [default to undefined]            |
| **totalPrice**  | **number**                                                                             | Total price from LLM requests related to this tool in USD              | [optional] [default to undefined] |
| **callCount**   | **number**                                                                             | Number of times this tool was called                                   | [default to undefined]            |
| **toolTokens**  | **number**                                                                             | Tool\&#39;s own execution token cost (e.g. subagent aggregate tokens)  | [optional] [default to undefined] |
| **toolPrice**   | **number**                                                                             | Tool\&#39;s own execution price in USD                                 | [optional] [default to undefined] |
| **subCalls**    | [**Array&lt;ThreadUsageStatisticsDtoSchema0&gt;**](ThreadUsageStatisticsDtoSchema0.md) | Sub-tool calls made within this tool (e.g. tools called by a subagent) | [optional] [default to undefined] |

## Example

```typescript
import { ThreadUsageStatisticsDtoSchema0 } from './api';

const instance: ThreadUsageStatisticsDtoSchema0 = {
  toolName,
  totalTokens,
  totalPrice,
  callCount,
  toolTokens,
  toolPrice,
  subCalls,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
