# TriggerReindexResponseDtoRepoIndex

## Properties

| Name                      | Type       | Description            | Notes                  |
| ------------------------- | ---------- | ---------------------- | ---------------------- |
| **id**                    | **string** | Index ID               | [default to undefined] |
| **repositoryId**          | **string** | Repository ID          | [default to undefined] |
| **repoUrl**               | **string** | Repository URL         | [default to undefined] |
| **status**                | **string** | Indexing status        | [default to undefined] |
| **qdrantCollection**      | **string** | Qdrant collection name | [default to undefined] |
| **lastIndexedCommit**     | **string** |                        | [default to undefined] |
| **embeddingModel**        | **string** |                        | [default to undefined] |
| **vectorSize**            | **number** |                        | [default to undefined] |
| **chunkingSignatureHash** | **string** |                        | [default to undefined] |
| **estimatedTokens**       | **number** |                        | [default to undefined] |
| **indexedTokens**         | **number** |                        | [default to undefined] |
| **errorMessage**          | **string** |                        | [default to undefined] |
| **createdAt**             | **string** |                        | [default to undefined] |
| **updatedAt**             | **string** |                        | [default to undefined] |

## Example

```typescript
import { TriggerReindexResponseDtoRepoIndex } from './api';

const instance: TriggerReindexResponseDtoRepoIndex = {
  id,
  repositoryId,
  repoUrl,
  status,
  qdrantCollection,
  lastIndexedCommit,
  embeddingModel,
  vectorSize,
  chunkingSignatureHash,
  estimatedTokens,
  indexedTokens,
  errorMessage,
  createdAt,
  updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
