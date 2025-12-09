# GraphRevisionsApi

All URIs are relative to _http://localhost_

| Method                                      | HTTP request                                    | Description |
| ------------------------------------------- | ----------------------------------------------- | ----------- |
| [**getGraphRevision**](#getgraphrevision)   | **GET** /api/v1/graphs/{graphId}/revisions/{id} |             |
| [**getGraphRevisions**](#getgraphrevisions) | **GET** /api/v1/graphs/{graphId}/revisions      |             |

# **getGraphRevision**

> GraphRevisionDto getGraphRevision()

### Example

```typescript
import { GraphRevisionsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new GraphRevisionsApi(configuration);

let graphId: string; // (default to undefined)
let id: string; // (default to undefined)

const { status, data } = await apiInstance.getGraphRevision(graphId, id);
```

### Parameters

| Name        | Type         | Description | Notes                 |
| ----------- | ------------ | ----------- | --------------------- |
| **graphId** | [**string**] |             | defaults to undefined |
| **id**      | [**string**] |             | defaults to undefined |

### Return type

**GraphRevisionDto**

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

# **getGraphRevisions**

> Array<GraphRevisionDto> getGraphRevisions()

### Example

```typescript
import { GraphRevisionsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new GraphRevisionsApi(configuration);

let graphId: string; // (default to undefined)
let status: 'pending' | 'applying' | 'applied' | 'failed'; // (optional) (default to undefined)
let limit: number; //Maximum number of revisions to return (optional) (default to undefined)

const { status, data } = await apiInstance.getGraphRevisions(
  graphId,
  status,
  limit,
);
```

### Parameters

| Name        | Type                   | Description                           | Notes                            |
| ----------- | ---------------------- | ------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --- | -------------------------------- |
| **graphId** | [**string**]           |                                       | defaults to undefined            |
| **status**  | [\*\*&#39;pending&#39; | &#39;applying&#39;                    | &#39;applied&#39;                | &#39;failed&#39;**]**Array<&#39;pending&#39; &#124; &#39;applying&#39; &#124; &#39;applied&#39; &#124; &#39;failed&#39;>\*\* |     | (optional) defaults to undefined |
| **limit**   | [**number**]           | Maximum number of revisions to return | (optional) defaults to undefined |

### Return type

**Array<GraphRevisionDto>**

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
