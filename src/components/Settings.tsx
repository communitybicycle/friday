import {
  Box,
  Button,
  Divider,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  PseudoBox,
  Text,
  useToast,
} from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { reinitializeDataReducer } from "../reducers/dataReducer";
import { closeSettings } from "../reducers/metaReducer";
import { RootState } from "../reducers/store";

type ItemProps = {
  name: string;
  description?: string;
};

const Item: React.FC<ItemProps> = ({ name, description, children }) => {
  return (
    <PseudoBox d="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Text fontWeight="bold">{name}</Text>
        {description && <Text color="gray">{description}</Text>}
      </Box>
      {children}
    </PseudoBox>
  );
};

const Settings: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state: RootState) => state.meta);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  const resetDataReducer = () => {
    dispatch(reinitializeDataReducer());
    toast({
      status: "success",
      duration: 7000,
      position: "bottom",
      title: "Data has been re-initialized!",
    });
  };

  return (
    <Modal isOpen={isSettingsOpen} onClose={handleClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={8} p={4} minH="600px">
        <Heading size="lg">Settings</Heading>
        <Divider />
        <Item
          name="Reset data"
          description="Resets only the modules, actions, and instructions"
        >
          <Button variantColor="red" onClick={resetDataReducer}>
            Reset
          </Button>
        </Item>
      </ModalContent>
    </Modal>
  );
};

export default hot(module)(Settings);
