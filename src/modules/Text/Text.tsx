import React from "react";
import { hot } from "react-hot-loader";
import { TextModule } from "../../types/modules";

interface Props {
  module: TextModule;
}

const Text: React.FC<Props> = ({ module }) => {
  return <div>{module.text}</div>;
};

export default hot(module)(Text);
