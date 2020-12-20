import React from "react";
import { Textarea } from "@chakra-ui/core";

interface IProps {
  data: any;
}

const Notes: React.FC<IProps> = ({ data }) => {
  return <Textarea placeholder={data.text}></Textarea>;
};

export default Notes;
