# CreateRepositoryDto

## Properties

| Name              | Type       | Description                                                  | Notes                                       |
| ----------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------- |
| **owner**         | **string** | Repository owner                                             | [default to undefined]                      |
| **repo**          | **string** | Repository name                                              | [default to undefined]                      |
| **url**           | **string** | HTTPS URL of the repository                                  | [default to undefined]                      |
| **provider**      | **string** | Git repository host provider                                 | [optional] [default to ProviderEnum_Github] |
| **defaultBranch** | **string** | Default branch of the repository (defaults to main)          | [optional] [default to 'main']              |
| **token**         | **string** | GitHub personal access token (encrypted at rest, write-only) | [optional] [default to undefined]           |

## Example

```typescript
import { CreateRepositoryDto } from './api';

const instance: CreateRepositoryDto = {
  owner,
  repo,
  url,
  provider,
  defaultBranch,
  token,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
