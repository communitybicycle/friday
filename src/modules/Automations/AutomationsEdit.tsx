import React from "react";
import { hot } from "react-hot-loader";
import { AutomationModule } from "../../types/modules";
import { EditModalContent } from "../../components/EditModuleModal";

interface Props {
  module: AutomationModule;
}

const AutomationsEdit: React.FC<Props> = ({ module }) => {
  const update = () => {
    console.log("Update clicked");
  };

  return (
    <EditModalContent onSubmit={update}>Edit Automations</EditModalContent>
  );
};

export default hot(module)(AutomationsEdit);
