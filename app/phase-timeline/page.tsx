import { Metadata, NextPage } from "next";

import { Timeline } from "./Timeline";

export const metadata: Metadata = {
  title: "timeline ",
};

const CV: NextPage = () => {
  return <Timeline />;
};

export default CV;
