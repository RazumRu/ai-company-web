# GraphMessagesResponseDtoThreadsInnerMessagesInnerAnyOf1

## Properties

| Name                 | Type                                                                                                                                                               | Description                 | Notes                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | --------------------------------- |
| **role**             | **string**                                                                                                                                                         | Message role                | [default to undefined]            |
| **content**          | **string**                                                                                                                                                         | Message content             | [default to undefined]            |
| **id**               | **string**                                                                                                                                                         | Message ID                  | [optional] [default to undefined] |
| **toolCalls**        | [**Array&lt;GraphMessagesResponseDtoThreadsInnerMessagesInnerAnyOf1ToolCallsInner&gt;**](GraphMessagesResponseDtoThreadsInnerMessagesInnerAnyOf1ToolCallsInner.md) | Tool calls in the message   | [optional] [default to undefined] |
| **additionalKwargs** | **{ [key: string]: any; }**                                                                                                                                        | Additional message metadata | [optional] [default to undefined] |

## Example

```typescript
import { GraphMessagesResponseDtoThreadsInnerMessagesInnerAnyOf1 } from './api';

const instance: GraphMessagesResponseDtoThreadsInnerMessagesInnerAnyOf1 = {
  role,
  content,
  id,
  toolCalls,
  additionalKwargs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
