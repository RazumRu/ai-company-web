# AnalyticsApi

All URIs are relative to _http://localhost_

| Method                          | HTTP request                       | Description |
| ------------------------------- | ---------------------------------- | ----------- |
| [**getByGraph**](#getbygraph)   | **GET** /api/v1/analytics/by-graph |             |
| [**getOverview**](#getoverview) | **GET** /api/v1/analytics/overview |             |

# **getByGraph**

> AnalyticsByGraphResponseDto getByGraph()

### Example

```typescript
import { AnalyticsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let dateFrom: string; //Include threads created on or after this ISO 8601 datetime (optional) (default to undefined)
let dateTo: string; //Include threads created before this ISO 8601 datetime (optional) (default to undefined)
let graphId: string; //Filter to a specific graph (optional) (default to undefined)

const { status, data } = await apiInstance.getByGraph(
  dateFrom,
  dateTo,
  graphId,
);
```

### Parameters

| Name         | Type         | Description                                                | Notes                            |
| ------------ | ------------ | ---------------------------------------------------------- | -------------------------------- |
| **dateFrom** | [**string**] | Include threads created on or after this ISO 8601 datetime | (optional) defaults to undefined |
| **dateTo**   | [**string**] | Include threads created before this ISO 8601 datetime      | (optional) defaults to undefined |
| **graphId**  | [**string**] | Filter to a specific graph                                 | (optional) defaults to undefined |

### Return type

**AnalyticsByGraphResponseDto**

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

# **getOverview**

> AnalyticsOverviewDto getOverview()

### Example

```typescript
import { AnalyticsApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new AnalyticsApi(configuration);

let dateFrom: string; //Include threads created on or after this ISO 8601 datetime (optional) (default to undefined)
let dateTo: string; //Include threads created before this ISO 8601 datetime (optional) (default to undefined)

const { status, data } = await apiInstance.getOverview(dateFrom, dateTo);
```

### Parameters

| Name         | Type         | Description                                                | Notes                            |
| ------------ | ------------ | ---------------------------------------------------------- | -------------------------------- |
| **dateFrom** | [**string**] | Include threads created on or after this ISO 8601 datetime | (optional) defaults to undefined |
| **dateTo**   | [**string**] | Include threads created before this ISO 8601 datetime      | (optional) defaults to undefined |

### Return type

**AnalyticsOverviewDto**

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
