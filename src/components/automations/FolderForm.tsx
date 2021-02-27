import {
  Box,
  Button,
  FormLabel,
  Input,
  useColorMode,
  useToast,
} from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import Dropzone from "react-dropzone-uploader";
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

const FolderForm: React.FC<Props> = ({ name, description, reset, action }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();

  const [path, setPath] = useState(action ? action.path : "");
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    if (action) {
      dispatch(
        editAction({ ...action, name, description, type: "folder", path })
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
          type: "folder",
          path,
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

  const handleChangeStatus = ({ file }: { file: any }) => {
    if (file) {
      setPath(file.path);
      setFileName(file.name);
    }
  };

  return (
    <Fragment>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        PreviewComponent={() => <Box>{fileName}</Box>}
        maxFiles={1}
        styles={{
          inputLabel: { color: colorMode === "light" ? "black" : "white" },
        }}
      />
      <FormLabel htmlFor="path" mt={4}>
        Path
      </FormLabel>
      <Input
        id="path"
        value={path}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPath(e.target.value)
        }
        placeholder="E. g. /home/sally/statusReport"
      />

      <Button variantColor="blue" onClick={handleSubmit} mt={4} mb={2}>
        Submit
      </Button>
    </Fragment>
  );
};

export default hot(module)(FolderForm);
