# ExecuteTriggerDto

## Properties

| Name            | Type                    | Description                                                            | Notes                             |
| --------------- | ----------------------- | ---------------------------------------------------------------------- | --------------------------------- |
| **messages**    | **Array&lt;string&gt;** | Array of messages to send to the trigger                               | [default to undefined]            |
| **threadSubId** | **string**              | Optional thread sub-ID that will be used to create the full thread ID. | [optional] [default to undefined] |
| **async**       | **boolean**             | If true, do not wait for execution to finish (fire-and-forget).        | [optional] [default to undefined] |

## Example

```typescript
import { ExecuteTriggerDto } from './api';

const instance: ExecuteTriggerDto = {
  messages,
  threadSubId,
  async,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
