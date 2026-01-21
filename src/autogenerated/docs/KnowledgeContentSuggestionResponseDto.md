# KnowledgeContentSuggestionResponseDto

## Properties

| Name         | Type                    | Description                                | Notes                             |
| ------------ | ----------------------- | ------------------------------------------ | --------------------------------- |
| **title**    | **string**              | Suggested knowledge document title         | [default to undefined]            |
| **content**  | **string**              | Suggested knowledge document content       | [default to undefined]            |
| **tags**     | **Array&lt;string&gt;** | Suggested tags for the knowledge document  | [optional] [default to undefined] |
| **threadId** | **string**              | Thread id used for this suggestion session | [default to undefined]            |

## Example

```typescript
import { KnowledgeContentSuggestionResponseDto } from './api';

const instance: KnowledgeContentSuggestionResponseDto = {
  title,
  content,
  tags,
  threadId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
