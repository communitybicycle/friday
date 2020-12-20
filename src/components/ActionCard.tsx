import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  PseudoBox,
  Text,
} from "@chakra-ui/core";
import Card from "./Card";
import { Action } from "../types";
import { deleteAction } from "../reducers/dataReducer";
import { runAction } from "../utils/actions";
import { useDispatch } from "react-redux";

interface Props {
  action: Action;
}

const ActionCard: React.FC<Props> = ({ action }) => {
  const dispatch = useDispatch();

  const handleClick = (action: Action) => {
    runAction(action);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAction(id));
  };

  return (
    <Card
      key={action.id}
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
        <Heading size="lg">{action.name}</Heading>
        <Divider />
        <Text color="grey" mb={4}>
          {action.description}
        </Text>
      </Box>
      <Flex justify="space-between">
        <Button variantColor="blue" onClick={() => handleClick(action)}>
          Run
        </Button>
        <PseudoBox opacity={0}>
          <IconButton
            variantColor="red"
            aria-label="delete"
            icon="delete"
            variant="link"
            onClick={() => handleDelete(action.id)}
          />
        </PseudoBox>
      </Flex>
    </Card>
  );
};

export default ActionCard;
