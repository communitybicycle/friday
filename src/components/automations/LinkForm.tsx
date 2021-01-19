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

const LinkForm: React.FC<Props> = ({ name, description, reset }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    dispatch(
      addAction({
        id: uuid(),
        name,
        description,
        type: "link",
        url,
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
      <FormLabel htmlFor="linkUrl">URL</FormLabel>
      <Input
        id="linkUrl"
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        placeholder="E. g. https://example.com"
      />

      <Button variantColor="blue" onClick={handleSubmit} mt={4}>
        Submit
      </Button>
    </Fragment>
  );
};

export default hot(module)(LinkForm);
