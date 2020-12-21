import React from "react";
import { hot } from "react-hot-loader";

interface IProps {
  data: any;
}

const Text: React.FC<IProps> = ({ data }) => {
  return <div>{data.text}</div>;
};

export default hot(module)(Text);
