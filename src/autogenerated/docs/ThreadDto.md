# ThreadDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | Thread ID | [default to undefined]
**graphId** | **string** | Graph ID | [default to undefined]
**externalThreadId** | **string** | External thread ID from LangChain | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**metadata** | **{ [key: string]: any; }** |  | [optional] [default to undefined]
**source** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { ThreadDto } from './api';

const instance: ThreadDto = {
    id,
    graphId,
    externalThreadId,
    createdAt,
    updatedAt,
    metadata,
    source,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
