import ReactTimeAgo from "react-time-ago";
export const TimeAgo = ({ date }: { date: string }) => {
  return <ReactTimeAgo date={new Date(date)} component={Time} />;
};

export function Time({ children }: { children: string }) {
  return children.replace("sonra", "içinde");
}
