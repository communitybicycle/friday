import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PseudoBox,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from "@chakra-ui/core";
import { BG_COLOR } from "data/constants";
import useQuery from "hooks/useQuery";
import React, { useEffect, useMemo, useState } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addInstruction, editInstruction } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { uuid } from "utils/index";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const NewInstruction: React.FC<Props> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const query = useQuery();
  const instructionId = query.get("id");
  const history = useHistory();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { actions, instructions: allInstructions } = useSelector(
    (state: RootState) => state.data
  );
  const [name, setName] = useState(
    instructionId ? allInstructions[instructionId].name : ""
  );
  const [description, setDescription] = useState(
    instructionId ? allInstructions[instructionId].description : ""
  );
  const [instructions, setInstructions] = useState<string[]>(
    instructionId ? allInstructions[instructionId].instructions : []
  );
  const [filter, setFilter] = useState("");
  const instruction = instructionId && allInstructions[instructionId];

  useEffect(() => {
    return () => reset();
  }, []);

  const filteredActions = useMemo(() => {
    return Object.values(actions).filter((action) => {
      const filterString = filter.toLowerCase();
      const nameString = action.name && action.name.toLowerCase();
      const descString = action.description && action.description.toLowerCase();

      if (nameString && nameString.includes(filterString)) {
        return true;
      }

      // noinspection RedundantIfStatementJS
      if (descString && descString.includes(filterString)) {
        return true;
      }

      return false;
    });
  }, [actions, filter]);

  const handleSubmit = () => {
    if (instruction) {
      dispatch(
        editInstruction({
          ...instruction,
          name,
          description,
          instructions,
        })
      );
      toast({
        title: "Instruction successfully edited!",
        status: "success",
      });
    } else {
      dispatch(
        addInstruction({
          id: uuid(),
          name,
          description,
          instructions,
        })
      );
      toast({
        title: "Instruction successfully created!",
        status: "success",
      });
    }
    reset();
    history.push("/instructions");
  };

  const reset = () => {
    setName("");
    setDescription("");
  };

  const addAction = (actionId: string) => {
    setInstructions([...instructions, actionId]);
  };

  const removeAction = (actionIndex: number) => {
    const newInstructions = [...instructions];
    newInstructions.splice(actionIndex, 1);
    setInstructions(newInstructions);
  };

  return (
    <Modal size="720px" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={8}>
        <ModalHeader>{`${
          instructionId ? "Edit" : "New"
        } Instruction`}</ModalHeader>
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
            placeholder="Add a name for your instruction! (50 character limit)"
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
            mb={4}
          />
          <Flex>
            <Box flexBasis="67%" mr={6}>
              <Heading size="lg" mb={2}>
                Choose Actions
              </Heading>
              <Input
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilter(e.target.value)
                }
                placeholder="Filter actions"
                mb={3}
              />
              <Box
                borderWidth={filteredActions.length > 0 ? 1 : 0}
                borderRadius={4}
                maxH={400}
                overflowY="scroll"
              >
                {filteredActions.map((action) => {
                  const isSelected = instructions.includes(action.id);
                  return (
                    <PseudoBox
                      key={action.id}
                      py={2}
                      px={4}
                      borderBottomWidth={1}
                      cursor={isSelected ? "default" : "pointer"}
                      backgroundColor={
                        isSelected
                          ? colorMode === "light"
                            ? "#efefef"
                            : "gray.700"
                          : colorMode === "light"
                          ? "#fff"
                          : BG_COLOR[colorMode]
                      }
                      _last={{ border: "none" }}
                      _hover={{
                        background:
                          colorMode === "light" ? "#efefef" : "#2D3748",
                      }}
                      onClick={() => {
                        if (!isSelected) {
                          addAction(action.id);
                        }
                      }}
                    >
                      <Text fontWeight="bold">{action.name}</Text>
                      <Text color="grey">{action.description}</Text>
                    </PseudoBox>
                  );
                })}
              </Box>
            </Box>
            <Box flexBasis="33%">
              <Heading size="lg" mb={2}>
                Selected
              </Heading>
              <List as="ol" styleType="decimal">
                {instructions.map((actionId, actionIndex) => (
                  <ListItem
                    key={actionId}
                    cursor="pointer"
                    onClick={() => removeAction(actionIndex)}
                  >
                    {actions[actionId].name}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Flex>
          <Button
            variantColor="blue"
            onClick={handleSubmit}
            mt={4}
            mb={2}
            isDisabled={!name || !description || instructions.length === 0}
          >
            Submit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default hot(module)(NewInstruction);
