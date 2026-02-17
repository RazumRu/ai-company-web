# KnowledgeDocCreateDto

## Properties

| Name        | Type                    | Description                    | Notes                             |
| ----------- | ----------------------- | ------------------------------ | --------------------------------- |
| **title**   | **string**              | Knowledge document title       | [default to undefined]            |
| **content** | **string**              | Raw knowledge document content | [default to undefined]            |
| **politic** | **string**              |                                | [optional] [default to undefined] |
| **tags**    | **Array&lt;string&gt;** |                                | [optional] [default to undefined] |

## Example

```typescript
import { KnowledgeDocCreateDto } from './api';

const instance: KnowledgeDocCreateDto = {
  title,
  content,
  politic,
  tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
