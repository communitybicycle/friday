import React from "react";
import { hot } from "react-hot-loader";
import { NotesModule } from "types/modules";
import { EditModalContent } from "components/EditModuleModal";

interface Props {
  module: NotesModule;
}

const NotesEdit: React.FC<Props> = ({ module }) => {
  const update = () => {
    console.log("Update...");
  };

  return (
    <EditModalContent id={module.id} onSubmit={update}>
      Edit Notes
    </EditModalContent>
  );
};

export default hot(module)(NotesEdit);
