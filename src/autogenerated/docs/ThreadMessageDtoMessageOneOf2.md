# ThreadMessageDtoMessageOneOf2

## Properties

| Name                 | Type                        | Description                          | Notes                             |
| -------------------- | --------------------------- | ------------------------------------ | --------------------------------- |
| **id**               | **string**                  | Message ID                           | [optional] [default to undefined] |
| **role**             | **string**                  | Message role                         | [default to undefined]            |
| **content**          | **string**                  | Reasoning trace emitted by the model | [default to undefined]            |
| **additionalKwargs** | **{ [key: string]: any; }** | Additional message metadata          | [optional] [default to undefined] |

## Example

```typescript
import { ThreadMessageDtoMessageOneOf2 } from './api';

const instance: ThreadMessageDtoMessageOneOf2 = {
  id,
  role,
  content,
  additionalKwargs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
