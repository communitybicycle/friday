import React, { useState } from "react";
import { hot } from "react-hot-loader";
import { TextModule } from "../../types/modules";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/core";
import { EditModalContent } from "../../components/EditModuleModal";
import { useDispatch } from "react-redux";
import { editModule } from "../../reducers/dataReducer";

interface Props {
  module: TextModule;
}

const TextEdit: React.FC<Props> = ({ module }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>(module.text);
  const [header, setHeader] = useState<string>(module.header);

  const update = () => {
    dispatch(editModule({ ...module, text, header }));
  };

  return (
    <EditModalContent onSubmit={update}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel htmlFor="module-header">Name</FormLabel>
          <Input
            id="module-header"
            value={header}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeader(e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="module-text">Text</FormLabel>
          <Textarea
            id="module-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
        </FormControl>
      </Stack>
    </EditModalContent>
  );
};

export default hot(module)(TextEdit);
