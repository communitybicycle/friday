import React from "react";
import { hot } from "react-hot-loader";

interface Props {}

const Welcome: React.FC<Props> = () => {
  return <div>Welcome!</div>;
};

export default hot(module)(Welcome);
