# KnowledgeDocInputDto

## Properties

| Name        | Type                    | Description                            | Notes                             |
| ----------- | ----------------------- | -------------------------------------- | --------------------------------- |
| **title**   | **string**              | Knowledge document title               | [default to undefined]            |
| **content** | **string**              | Raw knowledge document content         | [default to undefined]            |
| **tags**    | **Array&lt;string&gt;** | Optional tags to apply to the document | [optional] [default to undefined] |

## Example

```typescript
import { KnowledgeDocInputDto } from './api';

const instance: KnowledgeDocInputDto = {
  title,
  content,
  tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
