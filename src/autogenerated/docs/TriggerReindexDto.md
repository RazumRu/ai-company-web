# TriggerReindexDto

## Properties

| Name             | Type       | Description                                                          | Notes                             |
| ---------------- | ---------- | -------------------------------------------------------------------- | --------------------------------- |
| **repositoryId** | **string** | Repository ID to reindex                                             | [default to undefined]            |
| **branch**       | **string** | Branch to reindex. Defaults to the repository default branch (main). | [optional] [default to undefined] |

## Example

```typescript
import { TriggerReindexDto } from './api';

const instance: TriggerReindexDto = {
  repositoryId,
  branch,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
