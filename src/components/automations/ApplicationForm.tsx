import {
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/core";
import React, { Fragment, useState } from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addAction } from "../../reducers/dataReducer";
import { uuid } from "../../utils";
import Dropzone from "react-dropzone-uploader";

interface Props {
  name: string;
  description: string;
  reset: () => void;
}

const ApplicationForm: React.FC<Props> = ({ name, description, reset }) => {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [path, setPath] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = () => {
    dispatch(
      addAction({
        id: uuid(),
        name,
        description,
        type: "app",
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
        PreviewComponent={() => (
          <Box h="100%" alignSelf="center">
            {fileName}
          </Box>
        )}
        maxFiles={1}
      />
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

export default hot(module)(ApplicationForm);
