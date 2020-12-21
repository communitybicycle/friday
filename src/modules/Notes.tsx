import React from "react";
import { hot } from "react-hot-loader";
import { Textarea } from "@chakra-ui/core";

interface IProps {
  data: any;
}

const Notes: React.FC<IProps> = ({ data }) => {
  return <Textarea placeholder={data.text}></Textarea>;
};

export default hot(module)(Notes);
