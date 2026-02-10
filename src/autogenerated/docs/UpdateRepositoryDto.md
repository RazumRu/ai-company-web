# UpdateRepositoryDto

## Properties

| Name              | Type       | Description                                                  | Notes                             |
| ----------------- | ---------- | ------------------------------------------------------------ | --------------------------------- |
| **url**           | **string** | HTTPS URL of the repository                                  | [optional] [default to undefined] |
| **defaultBranch** | **string** | Default branch of the repository                             | [optional] [default to undefined] |
| **token**         | **string** | GitHub personal access token (encrypted at rest, write-only) | [optional] [default to undefined] |

## Example

```typescript
import { UpdateRepositoryDto } from './api';

const instance: UpdateRepositoryDto = {
  url,
  defaultBranch,
  token,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
