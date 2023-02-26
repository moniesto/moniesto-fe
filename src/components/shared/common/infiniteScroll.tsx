import { ReactNode } from "react";
import InfiniteScrollComponent from "react-infinite-scroll-component";
import { Spinner } from "./spinner";

type InfiniteScrollProps = {
  fetchData: () => void;
  dataLength: number;
  refresh?: () => void;
  pullDownToRefresh?: boolean;
  pullDownToRefreshThreshold?: number;
  children: ReactNode;
  hasMore: boolean;
};

export const InfiniteScroll = (props: InfiniteScrollProps) => {
  return (
    <InfiniteScrollComponent
      dataLength={props.dataLength} //This is important field to render the next data
      next={props.fetchData}
      hasMore={props.hasMore}
      loader={<Spinner></Spinner>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No more content to show.</b>
        </p>
      }
      // // below props only if you need pull down functionality
      // refreshFunction={props.refresh}
      // pullDownToRefresh={props.pullDownToRefresh}
      // pullDownToRefreshThreshold={props.pullDownToRefreshThreshold}
      // releaseToRefreshContent={
      //   <>
      //     &#8595;Release to refresh<Spinner></Spinner>
      //   </>
      // }
    >
      {props.children}
    </InfiniteScrollComponent>
  );
};

InfiniteScroll.defaultProps = {
  // pullDownToRefresh: true,
  // pullDownToRefreshThreshold: 100,
  // refresh: () =>{}
};
