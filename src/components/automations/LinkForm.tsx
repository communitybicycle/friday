import { Button, FormLabel, Input, useToast } from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addAction, editAction } from "../../reducers/dataReducer";
import { Action } from "../../types/action";
import { uuid } from "../../utils";

interface Props {
  name: string;
  description?: string;
  reset: () => void;
  action?: Action;
}

const LinkForm: React.FC<Props> = ({ name, description, reset, action }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const [url, setUrl] = useState(action ? action.url : "");

  const handleSubmit = () => {
    if (action) {
      dispatch(editAction({ ...action, name, description, type: "link", url }));

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
          type: "link",
          url,
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
