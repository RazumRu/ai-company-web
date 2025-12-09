# LitellmApi

All URIs are relative to _http://localhost_

| Method                        | HTTP request                   | Description |
| ----------------------------- | ------------------------------ | ----------- |
| [**listModels**](#listmodels) | **GET** /api/v1/litellm/models |             |

# **listModels**

> Array<LiteLlmModelDto> listModels()

### Example

```typescript
import { LitellmApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new LitellmApi(configuration);

const { status, data } = await apiInstance.listModels();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<LiteLlmModelDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
