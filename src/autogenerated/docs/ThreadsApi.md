# ThreadsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteThread**](#deletethread) | **DELETE** /api/v1/threads/{threadId} | |
|[**getThreadByExternalId**](#getthreadbyexternalid) | **GET** /api/v1/threads/external/{externalThreadId} | |
|[**getThreadById**](#getthreadbyid) | **GET** /api/v1/threads/{threadId} | |
|[**getThreadMessages**](#getthreadmessages) | **GET** /api/v1/threads/{threadId}/messages | |
|[**getThreads**](#getthreads) | **GET** /api/v1/threads | |

# **deleteThread**
> deleteThread()


### Example

```typescript
import {
    ThreadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ThreadsApi(configuration);

let threadId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteThread(
    threadId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **threadId** | [**string**] |  | defaults to undefined|


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

# **getThreadByExternalId**
> ThreadDto getThreadByExternalId()


### Example

```typescript
import {
    ThreadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ThreadsApi(configuration);

let externalThreadId: string; // (default to undefined)

const { status, data } = await apiInstance.getThreadByExternalId(
    externalThreadId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **externalThreadId** | [**string**] |  | defaults to undefined|


### Return type

**ThreadDto**

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

# **getThreadById**
> ThreadDto getThreadById()


### Example

```typescript
import {
    ThreadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ThreadsApi(configuration);

let threadId: string; // (default to undefined)

const { status, data } = await apiInstance.getThreadById(
    threadId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **threadId** | [**string**] |  | defaults to undefined|


### Return type

**ThreadDto**

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

# **getThreadMessages**
> Array<ThreadMessageDto> getThreadMessages()


### Example

```typescript
import {
    ThreadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ThreadsApi(configuration);

let threadId: string; // (default to undefined)
let nodeId: string; //Filter messages by node ID (agent node) (optional) (default to undefined)
let limit: number; //Maximum number of messages to return (optional) (default to 100)
let offset: number; //Number of messages to skip (optional) (default to 0)

const { status, data } = await apiInstance.getThreadMessages(
    threadId,
    nodeId,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **threadId** | [**string**] |  | defaults to undefined|
| **nodeId** | [**string**] | Filter messages by node ID (agent node) | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of messages to return | (optional) defaults to 100|
| **offset** | [**number**] | Number of messages to skip | (optional) defaults to 0|


### Return type

**Array<ThreadMessageDto>**

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

# **getThreads**
> Array<ThreadDto> getThreads()


### Example

```typescript
import {
    ThreadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ThreadsApi(configuration);

let graphId: string; //Filter by graph ID (optional) (default to undefined)
let limit: number; //Maximum number of threads to return (optional) (default to 50)
let offset: number; //Number of threads to skip (optional) (default to 0)

const { status, data } = await apiInstance.getThreads(
    graphId,
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **graphId** | [**string**] | Filter by graph ID | (optional) defaults to undefined|
| **limit** | [**number**] | Maximum number of threads to return | (optional) defaults to 50|
| **offset** | [**number**] | Number of threads to skip | (optional) defaults to 0|


### Return type

**Array<ThreadDto>**

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

