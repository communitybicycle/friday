import React from "react";
import { hot } from "react-hot-loader";

interface Props {
  name: string;
  description: string;
  reset: () => void;
}

const ApplicationForm: React.FC<Props> = ({ name, description }) => {
  return <div></div>;
};

export default hot(module)(ApplicationForm);
