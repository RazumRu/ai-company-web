# KnowledgeChunkDto

## Properties

| Name            | Type                    | Description | Notes                             |
| --------------- | ----------------------- | ----------- | --------------------------------- |
| **id**          | **string**              |             | [default to undefined]            |
| **publicId**    | **number**              |             | [default to undefined]            |
| **docId**       | **string**              |             | [default to undefined]            |
| **chunkIndex**  | **number**              |             | [default to undefined]            |
| **label**       | **string**              |             | [optional] [default to undefined] |
| **keywords**    | **Array&lt;string&gt;** |             | [optional] [default to undefined] |
| **text**        | **string**              |             | [default to undefined]            |
| **startOffset** | **number**              |             | [default to undefined]            |
| **endOffset**   | **number**              |             | [default to undefined]            |
| **createdAt**   | **string**              |             | [default to undefined]            |

## Example

```typescript
import { KnowledgeChunkDto } from './api';

const instance: KnowledgeChunkDto = {
  id,
  publicId,
  docId,
  chunkIndex,
  label,
  keywords,
  text,
  startOffset,
  endOffset,
  createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
