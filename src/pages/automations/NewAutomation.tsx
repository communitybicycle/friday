import React, { useState } from "react";
import { hot } from "react-hot-loader";
import PageHeader from "../../components/PageHeader";
import { Button, Input, Select, Stack } from "@chakra-ui/core";
import { capitalize, uuid } from "../../utils";
import { useDispatch } from "react-redux";
import { addAction } from "../../reducers/dataReducer";
import Dropzone from "react-dropzone";
import { ActionType } from "../../types/action";

const actions: ActionType[] = ["link", "folder", "app", "run"];

const NewAutomation: React.FC = () => {
  const dispatch = useDispatch();
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<string>("link");
  const [path, setPath] = useState("");

  const handleSubmit = () => {
    dispatch(
      addAction({
        id: uuid(),
        name,
        description,
        type: type as ActionType,
        path,
      })
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPath(e.target.files[0].path);
    }
  };

  return (
    <div>
      <PageHeader id="newAutomation" text="New Automation" />
      <Stack>
        <Select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setType(e.target.value)
          }
        >
          {actions.map((action) => (
            <option value={action} key={action}>
              {capitalize(action)}
            </option>
          ))}
        </Select>
        <Input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Add a name for your action!"
        />
        <Input
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          placeholder="Give a brief description for your action."
        />
        <Input
          value={path}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPath(e.target.value)
          }
          placeholder="Provide a path for this action."
        />
        <Input type="file" name="file" onChange={handleFileChange} />
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <Button variantColor="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default hot(module)(NewAutomation);
