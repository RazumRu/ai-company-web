# KnowledgeContentSuggestionRequestDto

## Properties

| Name               | Type                    | Description                                                       | Notes                             |
| ------------------ | ----------------------- | ----------------------------------------------------------------- | --------------------------------- |
| **userRequest**    | **string**              | User request describing knowledge content to create or improve    | [default to undefined]            |
| **currentTitle**   | **string**              | Optional existing knowledge document title                        | [optional] [default to undefined] |
| **currentContent** | **string**              | Optional existing knowledge document content                      | [optional] [default to undefined] |
| **currentTags**    | **Array&lt;string&gt;** | Optional existing tags for the knowledge document                 | [optional] [default to undefined] |
| **threadId**       | **string**              | Optional thread id to continue a previous suggestion conversation | [optional] [default to undefined] |

## Example

```typescript
import { KnowledgeContentSuggestionRequestDto } from './api';

const instance: KnowledgeContentSuggestionRequestDto = {
  userRequest,
  currentTitle,
  currentContent,
  currentTags,
  threadId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
