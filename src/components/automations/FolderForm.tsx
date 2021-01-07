import React from "react";
import { hot } from "react-hot-loader";

interface Props {
  name: string;
  description: string;
  reset: () => void;
}

const FolderForm: React.FC<Props> = ({ name, description, reset }) => {
  return <div></div>;
};

export default hot(module)(FolderForm);
