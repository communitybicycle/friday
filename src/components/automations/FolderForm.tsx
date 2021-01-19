import { Button, FormLabel, Input, useToast } from "@chakra-ui/core";
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

const FolderForm: React.FC<Props> = ({ name, description, reset }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [path, setPath] = useState("");

  const handleSubmit = () => {
    dispatch(
      addAction({
        id: uuid(),
        name,
        description,
        type: "folder",
        path,
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
        value={path}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPath(e.target.value)
        }
        placeholder="E. g. /home/sally/statusReport"
      />

      <Button variantColor="blue" onClick={handleSubmit} mt={4}>
        Submit
      </Button>
    </Fragment>
  );
};

export default hot(module)(FolderForm);
