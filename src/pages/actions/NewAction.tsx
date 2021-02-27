import {
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/core";
import ApplicationForm from "components/automations/ApplicationForm";
import CommandForm from "components/automations/CommandForm";
import FolderForm from "components/automations/FolderForm";
import LinkForm from "components/automations/LinkForm";
import { Card, CardTitle } from "components/card/Card";
import useQuery from "hooks/useQuery";
import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "reducers/store";
import { ActionType } from "types/action";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewAction: React.FC<Props> = ({ isOpen, onClose }) => {
  const query = useQuery();
  const actionId = query.get("id");
  const { colorMode } = useColorMode();
  const { actions } = useSelector((state: RootState) => state.data);
  const [selected, setSelected] = useState<ActionType | "">(
    actionId ? actions[actionId].type : ""
  );
  const [name, setName] = useState(actionId ? actions[actionId].name : "");
  const [description, setDescription] = useState(
    actionId ? actions[actionId].description : ""
  );

  const reset = () => {
    setName("");
    setDescription("");
    setSelected("");
  };

  const renderForm = () => {
    switch (selected) {
      case "link":
        return (
          <LinkForm
            name={name}
            description={description}
            reset={reset}
            action={actionId ? actions[actionId] : undefined}
          />
        );
      case "folder":
        return (
          <FolderForm
            name={name}
            description={description}
            reset={reset}
            action={actionId ? actions[actionId] : undefined}
          />
        );
      case "app":
        return (
          <ApplicationForm
            name={name}
            description={description}
            reset={reset}
            action={actionId ? actions[actionId] : undefined}
          />
        );
      case "cmd":
        return (
          <CommandForm
            name={name}
            description={description}
            reset={reset}
            action={actionId ? actions[actionId] : undefined}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal size="720px" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader>{`${actionId ? "Edit" : "New"} Action`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length < 51) {
                setName(e.target.value);
              }
            }}
            placeholder="Add a name for your action! (50 character limit)"
            mb={2}
          />
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length < 257) {
                setDescription(e.target.value);
              }
            }}
            placeholder="Give a brief description for your action. (256 character limit)"
            mb={8}
          />

          <SimpleGrid columns={4} spacing={4} mb={6}>
            <Card
              cursor={selected === "link" ? "default" : "pointer"}
              onClick={() => setSelected("link")}
              opacity={selected === "link" ? 1 : 0.6}
              borderColor={
                colorMode === "light"
                  ? "#E2E8F0"
                  : selected === "link"
                  ? "#FFF"
                  : "rgba(255,255,255,0.16)"
              }
            >
              <CardTitle size="md">Link</CardTitle>
              <Text color="grey">
                Opens a browser tab to the specified address.
              </Text>
            </Card>

            <Card
              cursor={selected === "folder" ? "default" : "pointer"}
              onClick={() => setSelected("folder")}
              opacity={selected === "folder" ? 1 : 0.6}
              borderColor={
                colorMode === "light"
                  ? "#E2E8F0"
                  : selected === "folder"
                  ? "#FFF"
                  : "rgba(255,255,255,0.16)"
              }
            >
              <CardTitle size="md">Folder</CardTitle>
              <Text color="grey">Opens a folder at the specified address.</Text>
            </Card>

            <Card
              cursor={selected === "app" ? "default" : "pointer"}
              onClick={() => setSelected("app")}
              opacity={selected === "app" ? 1 : 0.6}
              borderColor={
                colorMode === "light"
                  ? "#E2E8F0"
                  : selected === "app"
                  ? "#FFF"
                  : "rgba(255,255,255,0.16)"
              }
            >
              <CardTitle size="md">Application</CardTitle>
              <Text color="grey">
                Opens an application at the specified address.
              </Text>
            </Card>

            <Card
              cursor={selected === "cmd" ? "default" : "pointer"}
              onClick={() => setSelected("cmd")}
              opacity={selected === "cmd" ? 1 : 0.6}
              borderColor={
                colorMode === "light"
                  ? "#E2E8F0"
                  : selected === "cmd"
                  ? "#FFF"
                  : "rgba(255,255,255,0.16)"
              }
            >
              <CardTitle size="md">Command</CardTitle>
              <Text color="grey">
                Runs a command or a series of commands in the command line.
              </Text>
            </Card>
          </SimpleGrid>

          {renderForm()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default hot(module)(NewAction);
