import React from "react";
import { hot } from "react-hot-loader";
import { Textarea } from "@chakra-ui/core";
import { NotesModule } from "../../types/modules";

interface Props {
  module: NotesModule;
}

const Notes: React.FC<Props> = ({ module }) => {
  return <Textarea placeholder={module.text} />;
};

export default hot(module)(Notes);
