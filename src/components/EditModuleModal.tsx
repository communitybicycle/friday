import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import AutomationsEdit from "modules/Automations/AutomationsEdit";
import NotesEdit from "modules/Notes/NotesEdit";
import TextEdit from "modules/Text/TextEdit";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { closeEditModuleModal } from "reducers/metaReducer";
import { RootState } from "reducers/store";

interface EditModalContentProps {
  width?: string | number;
  onSubmit: () => void;
}

export type ChildHandle = React.ElementRef<typeof TextEdit | typeof NotesEdit>;

export const EditModalContent: React.FC<EditModalContentProps> = ({
  onSubmit,
  width,
  children,
}) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeEditModuleModal());
  };

  const handleClick = () => {
    onSubmit();
    handleClose();
  };

  return (
    <ModalContent maxW={width || 400}>
      <ModalHeader>Edit Module</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={handleClose}>
          Close
        </Button>
        <Button variantColor="blue" onClick={handleClick}>
          Save
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

interface Props {}

const EditModuleModal: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { isEditModuleModalOpen, editModuleModal: module } = useSelector(
    (state: RootState) => state.meta
  );

  const handleClose = () => {
    dispatch(closeEditModuleModal());
  };

  const renderEditModule = () => {
    if (!module) return;

    switch (module.type) {
      case "text":
        return <TextEdit module={module} />;
      case "notes":
        return <NotesEdit module={module} />;
      case "automations":
        return <AutomationsEdit module={module} />;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Modal isOpen={isEditModuleModalOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        {renderEditModule()}
      </Modal>
    </Fragment>
  );
};

export default hot(module)(EditModuleModal);
