import React from "react";

interface IProps {
  data: any;
}

const Text: React.FC<IProps> = ({ data }) => {
  return <div>{data.text}</div>;
};

export default Text;
