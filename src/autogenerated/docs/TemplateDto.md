# TemplateDto

## Properties

| Name            | Type                                                                 | Description | Notes                             |
| --------------- | -------------------------------------------------------------------- | ----------- | --------------------------------- |
| **id**          | **string**                                                           |             | [default to undefined]            |
| **name**        | **string**                                                           |             | [default to undefined]            |
| **description** | **string**                                                           |             | [default to undefined]            |
| **kind**        | **string**                                                           |             | [default to undefined]            |
| **schema**      | **{ [key: string]: any; }**                                          |             | [default to undefined]            |
| **inputs**      | [**Array&lt;TemplateDtoInputsInner&gt;**](TemplateDtoInputsInner.md) |             | [optional] [default to undefined] |
| **outputs**     | [**Array&lt;TemplateDtoInputsInner&gt;**](TemplateDtoInputsInner.md) |             | [optional] [default to undefined] |

## Example

```typescript
import { TemplateDto } from './api';

const instance: TemplateDto = {
  id,
  name,
  description,
  kind,
  schema,
  inputs,
  outputs,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
