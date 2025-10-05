export type RootStackParamList = {
  Home: undefined;
  Details: { id: number } | undefined;
};

export type FeedStackParamList = {
  FeedList: undefined;
  FeedDetail: { id: number };
};

export type RootTabParamList = {
  FeedTab: undefined;
  Messages: undefined;
};
