export type MessageMeta = {
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  offset: number;
};

export type MessageMetaState = Record<string, Record<string, MessageMeta>>;
