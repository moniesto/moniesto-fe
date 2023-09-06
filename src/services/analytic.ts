import ReactGA from "react-ga4";

export const sendAnalytic = ({
  hitType,
  page,
}: {
  hitType: "pageview" | string;
  page: string;
}) =>
  ReactGA.send({
    hitType,
    page,
  });
