# KnowledgeApi

All URIs are relative to _http://localhost_

| Method                                                    | HTTP request                                                          | Description |
| --------------------------------------------------------- | --------------------------------------------------------------------- | ----------- |
| [**analyzeThread**](#analyzethread)                       | **POST** /api/v1/threads/{threadId}/analyze                           |             |
| [**createDoc**](#createdoc)                               | **POST** /api/v1/knowledge-docs                                       |             |
| [**deleteDoc**](#deletedoc)                               | **DELETE** /api/v1/knowledge-docs/{id}                                |             |
| [**getDoc**](#getdoc)                                     | **GET** /api/v1/knowledge-docs/{id}                                   |             |
| [**listDocs**](#listdocs)                                 | **GET** /api/v1/knowledge-docs                                        |             |
| [**suggestAgentInstructions**](#suggestagentinstructions) | **POST** /api/v1/graphs/{graphId}/nodes/{nodeId}/suggest-instructions |             |
| [**suggestGraphInstructions**](#suggestgraphinstructions) | **POST** /api/v1/graphs/{graphId}/suggest-instructions                |             |
| [**suggestKnowledgeContent**](#suggestknowledgecontent)   | **POST** /api/v1/knowledge-docs/suggest                               |             |
| [**updateDoc**](#updatedoc)                               | **PUT** /api/v1/knowledge-docs/{id}                                   |             |

# **analyzeThread**

> ThreadAnalysisResponseDto analyzeThread(threadAnalysisRequestDto)

### Example

```typescript
import { KnowledgeApi, Configuration, ThreadAnalysisRequestDto } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let threadId: string; // (default to undefined)
let threadAnalysisRequestDto: ThreadAnalysisRequestDto; //

const { status, data } = await apiInstance.analyzeThread(
  threadId,
  threadAnalysisRequestDto,
);
```

### Parameters

| Name                         | Type                         | Description | Notes                 |
| ---------------------------- | ---------------------------- | ----------- | --------------------- |
| **threadAnalysisRequestDto** | **ThreadAnalysisRequestDto** |             |                       |
| **threadId**                 | [**string**]                 |             | defaults to undefined |

### Return type

**ThreadAnalysisResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createDoc**

> KnowledgeDocDto createDoc(knowledgeDocCreateDto)

### Example

```typescript
import { KnowledgeApi, Configuration, KnowledgeDocCreateDto } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let knowledgeDocCreateDto: KnowledgeDocCreateDto; //

const { status, data } = await apiInstance.createDoc(knowledgeDocCreateDto);
```

### Parameters

| Name                      | Type                      | Description | Notes |
| ------------------------- | ------------------------- | ----------- | ----- |
| **knowledgeDocCreateDto** | **KnowledgeDocCreateDto** |             |       |

### Return type

**KnowledgeDocDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteDoc**

> deleteDoc()

### Example

```typescript
import { KnowledgeApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteDoc(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **204**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getDoc**

> KnowledgeDocDto getDoc()

### Example

```typescript
import { KnowledgeApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getDoc(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**string**] |             | defaults to undefined |

### Return type

**KnowledgeDocDto**

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

# **listDocs**

> object listDocs()

### Example

```typescript
import { KnowledgeApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let tags: Array<string>; //Filter by tags (match any) (optional) (default to undefined)
let search: string; //Search in title/summary/content (optional) (default to undefined)
let limit: number; // (optional) (default to 50)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.listDocs(
  tags,
  search,
  limit,
  offset,
);
```

### Parameters

| Name       | Type                    | Description                     | Notes                            |
| ---------- | ----------------------- | ------------------------------- | -------------------------------- |
| **tags**   | **Array&lt;string&gt;** | Filter by tags (match any)      | (optional) defaults to undefined |
| **search** | [**string**]            | Search in title/summary/content | (optional) defaults to undefined |
| **limit**  | [**number**]            |                                 | (optional) defaults to 50        |
| **offset** | [**number**]            |                                 | (optional) defaults to 0         |

### Return type

**object**

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

# **suggestAgentInstructions**

> SuggestAgentInstructionsResponseDto suggestAgentInstructions(suggestAgentInstructionsDto)

### Example

```typescript
import {
  KnowledgeApi,
  Configuration,
  SuggestAgentInstructionsDto,
} from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let graphId: string; // (default to undefined)
let nodeId: string; // (default to undefined)
let suggestAgentInstructionsDto: SuggestAgentInstructionsDto; //

const { status, data } = await apiInstance.suggestAgentInstructions(
  graphId,
  nodeId,
  suggestAgentInstructionsDto,
);
```

### Parameters

| Name                            | Type                            | Description | Notes                 |
| ------------------------------- | ------------------------------- | ----------- | --------------------- |
| **suggestAgentInstructionsDto** | **SuggestAgentInstructionsDto** |             |                       |
| **graphId**                     | [**string**]                    |             | defaults to undefined |
| **nodeId**                      | [**string**]                    |             | defaults to undefined |

### Return type

**SuggestAgentInstructionsResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **suggestGraphInstructions**

> SuggestGraphInstructionsResponseDto suggestGraphInstructions(suggestGraphInstructionsDto)

### Example

```typescript
import {
  KnowledgeApi,
  Configuration,
  SuggestGraphInstructionsDto,
} from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let graphId: string; // (default to undefined)
let suggestGraphInstructionsDto: SuggestGraphInstructionsDto; //

const { status, data } = await apiInstance.suggestGraphInstructions(
  graphId,
  suggestGraphInstructionsDto,
);
```

### Parameters

| Name                            | Type                            | Description | Notes                 |
| ------------------------------- | ------------------------------- | ----------- | --------------------- |
| **suggestGraphInstructionsDto** | **SuggestGraphInstructionsDto** |             |                       |
| **graphId**                     | [**string**]                    |             | defaults to undefined |

### Return type

**SuggestGraphInstructionsResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **suggestKnowledgeContent**

> KnowledgeContentSuggestionResponseDto suggestKnowledgeContent(knowledgeContentSuggestionRequestDto)

### Example

```typescript
import {
  KnowledgeApi,
  Configuration,
  KnowledgeContentSuggestionRequestDto,
} from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let knowledgeContentSuggestionRequestDto: KnowledgeContentSuggestionRequestDto; //

const { status, data } = await apiInstance.suggestKnowledgeContent(
  knowledgeContentSuggestionRequestDto,
);
```

### Parameters

| Name                                     | Type                                     | Description | Notes |
| ---------------------------------------- | ---------------------------------------- | ----------- | ----- |
| **knowledgeContentSuggestionRequestDto** | **KnowledgeContentSuggestionRequestDto** |             |       |

### Return type

**KnowledgeContentSuggestionResponseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **201**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateDoc**

> KnowledgeDocDto updateDoc(knowledgeDocUpdateDto)

### Example

```typescript
import { KnowledgeApi, Configuration, KnowledgeDocUpdateDto } from './api';

const configuration = new Configuration();
const apiInstance = new KnowledgeApi(configuration);

let id: string; // (default to undefined)
let knowledgeDocUpdateDto: KnowledgeDocUpdateDto; //

const { status, data } = await apiInstance.updateDoc(id, knowledgeDocUpdateDto);
```

### Parameters

| Name                      | Type                      | Description | Notes                 |
| ------------------------- | ------------------------- | ----------- | --------------------- |
| **knowledgeDocUpdateDto** | **KnowledgeDocUpdateDto** |             |                       |
| **id**                    | [**string**]              |             | defaults to undefined |

### Return type

**KnowledgeDocDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     |             | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
