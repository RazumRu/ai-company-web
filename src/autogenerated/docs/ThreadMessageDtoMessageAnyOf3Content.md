# ThreadMessageDtoMessageAnyOf3Content

Parsed shell execution result

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**exitCode** | **number** | Exit code of the shell command | [default to undefined]
**stdout** | **string** | Standard output from the command | [default to undefined]
**stderr** | **string** | Standard error from the command | [default to undefined]
**cmd** | **string** | The command that was executed | [default to undefined]
**fail** | **boolean** | Whether the command failed | [optional] [default to undefined]

## Example

```typescript
import { ThreadMessageDtoMessageAnyOf3Content } from './api';

const instance: ThreadMessageDtoMessageAnyOf3Content = {
    exitCode,
    stdout,
    stderr,
    cmd,
    fail,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
