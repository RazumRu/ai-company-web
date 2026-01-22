# KnowledgeDocInputDto

## Properties

| Name        | Type                    | Description                                                                                                                                                                                                                      | Notes                             |
| ----------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **title**   | **string**              | Knowledge document title                                                                                                                                                                                                         | [default to undefined]            |
| **content** | **string**              | Raw knowledge document content                                                                                                                                                                                                   | [default to undefined]            |
| **politic** | **string**              | Optional LLM usage guidance for this document. If the politic instructs to fetch full content (e.g. \&quot;always fetch the full content instead of fetching only specific chunks\&quot;), full document retrieval is permitted. | [optional] [default to undefined] |
| **tags**    | **Array&lt;string&gt;** | Optional tags to apply to the document                                                                                                                                                                                           | [optional] [default to undefined] |

## Example

```typescript
import { KnowledgeDocInputDto } from './api';

const instance: KnowledgeDocInputDto = {
  title,
  content,
  politic,
  tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
