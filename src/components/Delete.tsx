import React, { useRef, useState } from "react";
import { hot } from "react-hot-loader";
import {
  Button,
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
  title?: string;
  body?: string;
  children: (arg: any) => React.ReactNode;
}

type CallbackFunction = (...args: any[]) => void;

const Delete: React.FC<Props> = ({
  title = "Wait a second!",
  body = "This action is irreversible. Are you sure you want to do this?",
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [callback, setCallback] = useState<CallbackFunction | null>(null);
  const cancelRef = useRef(null);

  const showModal = (newCallback: CallbackFunction) => (
    event: HTMLFormElement
  ) => {
    event.preventDefault();
    onOpen();
    setCallback(() => () => newCallback());
  };

  const hideModal = () => {
    onClose();
    setCallback(null);
  };

  const confirm = () => {
    if (callback) {
      callback();
      hideModal();
    }
  };

  return (
    <React.Fragment>
      {children(showModal)}

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={hideModal}
          initialFocusRef={cancelRef}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-body"
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader id="delete-dialog-title">{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody id="delete-dialog-body">{body}</ModalBody>
            <ModalFooter>
              <Button ref={cancelRef} mr={3} onClick={hideModal}>
                Cancel
              </Button>
              <Button variantColor="red" onClick={confirm}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default hot(module)(Delete);
