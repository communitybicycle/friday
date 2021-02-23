import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  PseudoBox,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteInstruction } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { Instruction } from "types/instructions";
import { runInstruction } from "utils/automations";
import { Card } from "components/card/Card";
import Delete from "components/Delete";

interface Props {
  instruction: Instruction;
  readOnly?: boolean;
}

const InstructionCard: React.FC<Props> = ({ instruction, readOnly }) => {
  const history = useHistory();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { actions } = useSelector((state: RootState) => state.data);
  const greyFont = colorMode === "light" ? "grey" : "white";

  const handleClick = () => {
    runInstruction(instruction, actions);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteInstruction(id));
  };

  return (
    <Card
      minW="286px"
      maxW="286px"
      mb={4}
      mr={4}
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      _hover={{
        "& > div > div": {
          opacity: 1,
        },
      }}
    >
      <Box>
        <Heading size="lg">{instruction.name}</Heading>
        <Divider />
        <Text color={greyFont} mb={2}>
          {instruction.description}
        </Text>
        <Box
          borderRadius={4}
          backgroundColor="rgba(213,237,255,0.3)"
          p={2}
          mb={4}
        >
          <List as="ol" styleType="decimal">
            {instruction.instructions.map((actionId) => (
              <ListItem key={actionId} color={greyFont}>
                {actions[actionId].name}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Flex justify="space-between">
        <Button variantColor="blue" onClick={() => handleClick()}>
          Run
        </Button>
        {!readOnly && (
          <PseudoBox opacity={0}>
            <IconButton
              aria-label="edit"
              icon="edit"
              variant="ghost"
              onClick={() =>
                history.push(`/instructions/new?id=${instruction.id}`)
              }
            />
            <Delete>
              {(confirm: any) => (
                <IconButton
                  variantColor="red"
                  aria-label="delete"
                  icon="delete"
                  variant="ghost"
                  onClick={confirm(() => handleDelete(instruction.id))}
                />
              )}
            </Delete>
          </PseudoBox>
        )}
      </Flex>
    </Card>
  );
};

export default hot(module)(InstructionCard);
