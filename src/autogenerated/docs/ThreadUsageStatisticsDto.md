# ThreadUsageStatisticsDto

## Properties

| Name                  | Type                                                                                                  | Description                                                | Notes                  |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ---------------------- |
| **total**             | [**ThreadUsageStatisticsDtoTotal**](ThreadUsageStatisticsDtoTotal.md)                                 |                                                            | [default to undefined] |
| **requests**          | **number**                                                                                            | Total number of requests (messages with requestTokenUsage) | [default to undefined] |
| **byNode**            | [**{ [key: string]: ThreadUsageStatisticsDtoByNodeValue; }**](ThreadUsageStatisticsDtoByNodeValue.md) | Usage statistics breakdown by node ID                      | [default to undefined] |
| **byTool**            | [**Array&lt;ThreadUsageStatisticsDtoByToolInner&gt;**](ThreadUsageStatisticsDtoByToolInner.md)        | Usage statistics breakdown by tool name                    | [default to undefined] |
| **toolsAggregate**    | [**ThreadUsageStatisticsDtoToolsAggregate**](ThreadUsageStatisticsDtoToolsAggregate.md)               |                                                            | [default to undefined] |
| **messagesAggregate** | [**ThreadUsageStatisticsDtoMessagesAggregate**](ThreadUsageStatisticsDtoMessagesAggregate.md)         |                                                            | [default to undefined] |

## Example

```typescript
import { ThreadUsageStatisticsDto } from './api';

const instance: ThreadUsageStatisticsDto = {
  total,
  requests,
  byNode,
  byTool,
  toolsAggregate,
  messagesAggregate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
