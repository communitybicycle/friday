import React, { FunctionComponent } from "react";

interface IProps {
  data: any;
}

const Text: FunctionComponent<IProps> = ({ data }) => {
  return <div>{data.text}</div>;
};

export default Text;
