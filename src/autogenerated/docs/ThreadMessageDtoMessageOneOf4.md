# ThreadMessageDtoMessageOneOf4

## Properties

| Name                 | Type                                                                                | Description                 | Notes                             |
| -------------------- | ----------------------------------------------------------------------------------- | --------------------------- | --------------------------------- |
| **role**             | **string**                                                                          | Message role                | [default to undefined]            |
| **name**             | **string**                                                                          | Tool name - shell           | [default to undefined]            |
| **content**          | [**ThreadMessageDtoMessageOneOf4Content**](ThreadMessageDtoMessageOneOf4Content.md) |                             | [default to undefined]            |
| **toolCallId**       | **string**                                                                          | Tool call ID                | [default to undefined]            |
| **runId**            | **string**                                                                          |                             | [optional] [default to undefined] |
| **additionalKwargs** | **{ [key: string]: any; }**                                                         | Additional message metadata | [optional] [default to undefined] |

## Example

```typescript
import { ThreadMessageDtoMessageOneOf4 } from './api';

const instance: ThreadMessageDtoMessageOneOf4 = {
  role,
  name,
  content,
  toolCallId,
  runId,
  additionalKwargs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
