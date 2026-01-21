# ThreadMessageDto

## Properties

| Name                  | Type                                                                          | Description | Notes                             |
| --------------------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------- |
| **id**                | **string**                                                                    |             | [default to undefined]            |
| **threadId**          | **string**                                                                    |             | [default to undefined]            |
| **nodeId**            | **string**                                                                    |             | [default to undefined]            |
| **externalThreadId**  | **string**                                                                    |             | [default to undefined]            |
| **createdAt**         | **string**                                                                    |             | [default to undefined]            |
| **updatedAt**         | **string**                                                                    |             | [default to undefined]            |
| **message**           | [**ThreadMessageDtoMessage**](ThreadMessageDtoMessage.md)                     |             | [default to undefined]            |
| **requestTokenUsage** | [**ThreadMessageDtoRequestTokenUsage**](ThreadMessageDtoRequestTokenUsage.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { ThreadMessageDto } from './api';

const instance: ThreadMessageDto = {
  id,
  threadId,
  nodeId,
  externalThreadId,
  createdAt,
  updatedAt,
  message,
  requestTokenUsage,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
