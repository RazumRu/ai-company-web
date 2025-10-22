# GraphsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createGraph**](#creategraph) | **POST** /api/v1/graphs | |
|[**deleteGraph**](#deletegraph) | **DELETE** /api/v1/graphs/{id} | |
|[**destroyGraph**](#destroygraph) | **POST** /api/v1/graphs/{id}/destroy | |
|[**executeTrigger**](#executetrigger) | **POST** /api/v1/graphs/{graphId}/triggers/{triggerId}/execute | |
|[**findGraphById**](#findgraphbyid) | **GET** /api/v1/graphs/{id} | |
|[**getAllGraphs**](#getallgraphs) | **GET** /api/v1/graphs | |
|[**getNodeMessages**](#getnodemessages) | **GET** /api/v1/graphs/{graphId}/nodes/{nodeId}/messages | |
|[**runGraph**](#rungraph) | **POST** /api/v1/graphs/{id}/run | |
|[**updateGraph**](#updategraph) | **PUT** /api/v1/graphs/{id} | |

# **createGraph**
> GraphDto createGraph(createGraphDto)


### Example

```typescript
import {
    GraphsApi,
    Configuration,
    CreateGraphDto
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let createGraphDto: CreateGraphDto; //

const { status, data } = await apiInstance.createGraph(
    createGraphDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createGraphDto** | **CreateGraphDto**|  | |


### Return type

**GraphDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteGraph**
> deleteGraph()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteGraph(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **destroyGraph**
> GraphDto destroyGraph()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.destroyGraph(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GraphDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **executeTrigger**
> ExecuteTriggerResponseDto executeTrigger(executeTriggerDto)


### Example

```typescript
import {
    GraphsApi,
    Configuration,
    ExecuteTriggerDto
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let graphId: string; // (default to undefined)
let triggerId: string; // (default to undefined)
let executeTriggerDto: ExecuteTriggerDto; //

const { status, data } = await apiInstance.executeTrigger(
    graphId,
    triggerId,
    executeTriggerDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **executeTriggerDto** | **ExecuteTriggerDto**|  | |
| **graphId** | [**string**] |  | defaults to undefined|
| **triggerId** | [**string**] |  | defaults to undefined|


### Return type

**ExecuteTriggerResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **findGraphById**
> GraphDto findGraphById()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.findGraphById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GraphDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllGraphs**
> Array<GraphDto> getAllGraphs()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

const { status, data } = await apiInstance.getAllGraphs();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<GraphDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNodeMessages**
> GraphMessagesResponseDto getNodeMessages()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let graphId: string; // (default to undefined)
let nodeId: string; // (default to undefined)
let threadId: string; //Full thread ID (e.g., \"graphId:threadComponent\") (default to undefined)
let limit: number; //Maximum number of messages to return (optional) (default to undefined)

const { status, data } = await apiInstance.getNodeMessages(
    graphId,
    nodeId,
    threadId,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **graphId** | [**string**] |  | defaults to undefined|
| **nodeId** | [**string**] |  | defaults to undefined|
| **threadId** | [**string**] | Full thread ID (e.g., \&quot;graphId:threadComponent\&quot;) | defaults to undefined|
| **limit** | [**number**] | Maximum number of messages to return | (optional) defaults to undefined|


### Return type

**GraphMessagesResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **runGraph**
> GraphDto runGraph()


### Example

```typescript
import {
    GraphsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.runGraph(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GraphDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateGraph**
> GraphDto updateGraph(updateGraphDto)


### Example

```typescript
import {
    GraphsApi,
    Configuration,
    UpdateGraphDto
} from './api';

const configuration = new Configuration();
const apiInstance = new GraphsApi(configuration);

let id: string; // (default to undefined)
let updateGraphDto: UpdateGraphDto; //

const { status, data } = await apiInstance.updateGraph(
    id,
    updateGraphDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateGraphDto** | **UpdateGraphDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**GraphDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

