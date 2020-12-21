import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/core";

interface Props {
  module: any;
}

const EditModuleModal: React.FC<Props> = ({ module }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <IconButton
        id="page-action"
        aria-label="edit module"
        icon="settings"
        onClick={onOpen}
        variantColor="ghostGray"
        variant="ghost"
        opacity="0"
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>BOdy goes here</ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default hot(module)(EditModuleModal);
