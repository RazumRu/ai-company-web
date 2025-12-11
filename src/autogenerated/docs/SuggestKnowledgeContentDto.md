# SuggestKnowledgeContentDto

## Properties

| Name            | Type       | Description                                                                 | Notes                             |
| --------------- | ---------- | --------------------------------------------------------------------------- | --------------------------------- |
| **userRequest** | **string** | User request describing the knowledge content to generate                   | [default to undefined]            |
| **threadId**    | **string** | Optional thread id to continue a previous knowledge suggestion conversation | [optional] [default to undefined] |

## Example

```typescript
import { SuggestKnowledgeContentDto } from './api';

const instance: SuggestKnowledgeContentDto = {
  userRequest,
  threadId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
