import ReactGA from "react-ga4";

export const sendAnalytic = ({
  hitType,
  page,
}: {
  hitType: "pageview" | string;
  page: string;
}) => {
  console.log("send analytic :", "hitType :", hitType, "page :", page);
  // ReactGA.send({
  //   hitType,
  //   page,
  // });
};
