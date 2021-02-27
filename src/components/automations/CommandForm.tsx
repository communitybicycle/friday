import {
  Button,
  Flex,
  FormLabel,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addAction, editAction } from "reducers/dataReducer";
import { Action } from "types/action";
import { uuid } from "utils/index";

interface Props {
  name: string;
  description?: string;
  reset: () => void;
  action?: Action;
}

const CommandForm: React.FC<Props> = ({ name, description, reset, action }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [command, setCommand] = useState(action ? action.command : "");
  const [target, setTarget] = useState(action ? action.target : "");
  const [detached, setDetached] = useState(action ? action.detached : true);

  const handleSubmit = () => {
    if (action) {
      dispatch(
        editAction({
          ...action,
          name,
          description,
          type: "cmd",
          command,
          target,
          detached,
        })
      );

      toast({
        title: "Action successfully edited!",
        status: "success",
      });
    } else {
      dispatch(
        addAction({
          id: uuid(),
          name,
          description,
          type: "cmd",
          command,
          target,
          detached,
        })
      );
      toast({
        title: "Action successfully created!",
        status: "success",
      });
    }
    reset();
    history.push("/actions");
  };

  return (
    <Fragment>
      <FormLabel htmlFor="path">Path</FormLabel>
      <Input
        id="path"
        value={command}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCommand(e.target.value)
        }
        placeholder="E. g. jupyter notebook"
        mb={2}
      />
      <FormLabel htmlFor="target">Target</FormLabel>
      <Input
        id="target"
        value={target}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTarget(e.target.value)
        }
        placeholder="E. g. /home/sally/statusReport"
        mb={2}
      />
      <Flex align="center">
        <FormLabel htmlFor="detached">Detached</FormLabel>
        <Switch
          id="detached"
          isChecked={detached}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDetached(e.target.checked)
          }
        />
      </Flex>

      <Button variantColor="blue" onClick={handleSubmit} mt={4} mb={2}>
        Submit
      </Button>
    </Fragment>
  );
};

export default hot(module)(CommandForm);
