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
import { Card } from "components/card/Card";
import Delete from "components/Delete";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteAction } from "reducers/dataReducer";
import { Action } from "types/action";
import { runAction } from "utils/automations";

interface Props {
  action: Action;
}

const ActionCard: React.FC<Props> = ({ action }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (action: Action) => {
    runAction(action);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAction(id));
  };

  return (
    <Card
      minW="286px"
      maxW="286px"
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
            aria-label="edit"
            icon="edit"
            variant="ghost"
            onClick={() => history.push(`/actions/new?id=${action.id}`)}
            mr={1}
          />
          <Delete>
            {(confirm: any) => (
              <IconButton
                variantColor="red"
                aria-label="delete"
                icon="delete"
                variant="ghost"
                onClick={confirm(() => handleDelete(action.id))}
              />
            )}
          </Delete>
        </PseudoBox>
      </Flex>
    </Card>
  );
};

export default hot(module)(ActionCard);
