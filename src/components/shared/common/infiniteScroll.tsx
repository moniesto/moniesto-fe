import { ReactNode, memo } from "react";
import InfiniteScrollComponent from "react-infinite-scroll-component";

type InfiniteScrollProps = {
  fetchData: () => void;
  dataLength: number;
  refresh?: () => void;
  pullDownToRefresh?: boolean;
  pullDownToRefreshThreshold?: number;
  children: ReactNode;
  hasMore: boolean;
  loader?: ReactNode;
};

export const InfiniteScroll = memo((props: InfiniteScrollProps) => {
  console.log("render");
  return (
    <InfiniteScrollComponent
      dataLength={props.dataLength}
      next={props.fetchData}
      hasMore={props.hasMore}
      loader={props.loader}
    >
      {props.children}
    </InfiniteScrollComponent>
  );
});
