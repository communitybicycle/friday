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
import { addAction } from "../../reducers/dataReducer";
import { uuid } from "../../utils";

interface Props {
  name: string;
  description: string;
  reset: () => void;
}

const CommandForm: React.FC<Props> = ({ name, description, reset }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [command, setCommand] = useState("");
  const [target, setTarget] = useState("");
  const [detached, setDetached] = useState(true);

  const handleSubmit = () => {
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
    history.push("/actions");
    toast({
      title: "Action successfully created!",
      status: "success",
    });
    reset();
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

      <Button variantColor="blue" onClick={handleSubmit} mt={4}>
        Submit
      </Button>
    </Fragment>
  );
};

export default hot(module)(CommandForm);
