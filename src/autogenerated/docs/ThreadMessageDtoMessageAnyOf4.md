# ThreadMessageDtoMessageAnyOf4


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**role** | **string** | Message role | [default to undefined]
**name** | **string** | Tool name | [default to undefined]
**content** | **{ [key: string]: any; }** | Parsed tool result as JSON | [default to undefined]
**toolCallId** | **string** | Tool call ID | [default to undefined]
**additionalKwargs** | **{ [key: string]: any; }** | Additional message metadata | [optional] [default to undefined]

## Example

```typescript
import { ThreadMessageDtoMessageAnyOf4 } from './api';

const instance: ThreadMessageDtoMessageAnyOf4 = {
    role,
    name,
    content,
    toolCallId,
    additionalKwargs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
