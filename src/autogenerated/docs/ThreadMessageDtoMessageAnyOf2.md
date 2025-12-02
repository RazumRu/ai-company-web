# ThreadMessageDtoMessageAnyOf2

## Properties

| Name                 | Type                        | Description                 | Notes                             |
| -------------------- | --------------------------- | --------------------------- | --------------------------------- |
| **role**             | **string**                  | Message role                | [default to undefined]            |
| **content**          | **string**                  | Message content             | [default to undefined]            |
| **additionalKwargs** | **{ [key: string]: any; }** | Additional message metadata | [optional] [default to undefined] |

## Example

```typescript
import { ThreadMessageDtoMessageAnyOf2 } from './api';

const instance: ThreadMessageDtoMessageAnyOf2 = {
  role,
  content,
  additionalKwargs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
