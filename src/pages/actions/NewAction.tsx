import {Box, FormLabel, Input, SimpleGrid, Text, Textarea,} from "@chakra-ui/core";
import React, {useState} from "react";
import {hot} from "react-hot-loader";
import ApplicationForm from "../../components/automations/ApplicationForm";
import CommandForm from "../../components/automations/CommandForm";
import FolderForm from "../../components/automations/FolderForm";
import LinkForm from "../../components/automations/LinkForm";
import {Card, CardTitle} from "../../components/Card";
import Center from "../../components/Center";
import PageHeader from "../../components/PageHeader";
import {ActionType} from "../../types/action";

// const actions: ActionType[] = ["link", "folder", "app", "cmd"];

const NewAction: React.FC = () => {
  const [selected, setSelected] = useState<ActionType | "">("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target && e.target.files && e.target.files[0]) {
  //     setPath(e.target.files[0].path);
  //   }
  // };

  const reset = () => {
    setName("");
    setDescription("");
    setSelected("");
  };

  const renderForm = () => {
    switch (selected) {
      case "link":
        return <LinkForm name={name} description={description} reset={reset} />;
      case "folder":
        return (
          <FolderForm name={name} description={description} reset={reset} />
        );
      case "app":
        return (
          <ApplicationForm
            name={name}
            description={description}
            reset={reset}
          />
        );
      case "cmd":
        return (
          <CommandForm name={name} description={description} reset={reset} />
        );
      default:
        return null;
    }
  };

  return (
    <Center>
      <Box w="720px">
        <PageHeader id="newAction" text="New Action" />

        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length < 51) {
              setName(e.target.value);
            }
          }}
          placeholder="Add a name for your action! (50 character limit)"
          mb={2}
        />
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length < 257) {
              setDescription(e.target.value);
            }
          }}
          placeholder="Give a brief description for your action. (256 character limit)"
          mb={8}
        />

        <SimpleGrid columns={4} spacing={4} mb={6}>
          <Card
            cursor={selected === "link" ? "default" : "pointer"}
            onClick={() => setSelected("link")}
            opacity={selected === "link" ? 1 : 0.6}
          >
            <CardTitle size="md">Link</CardTitle>
            <Text color="grey">
              Opens a browser tab to the specified address.
            </Text>
          </Card>

          <Card
            cursor={selected === "folder" ? "default" : "pointer"}
            onClick={() => setSelected("folder")}
            opacity={selected === "folder" ? 1 : 0.6}
          >
            <CardTitle size="md">Folder</CardTitle>
            <Text color="grey">Opens a folder at the specified address.</Text>
          </Card>

          <Card
            cursor={selected === "app" ? "default" : "pointer"}
            onClick={() => setSelected("app")}
            opacity={selected === "app" ? 1 : 0.6}
          >
            <CardTitle size="md">Application</CardTitle>
            <Text color="grey">
              Opens an application at the specified address.
            </Text>
          </Card>

          <Card
            cursor={selected === "cmd" ? "default" : "pointer"}
            onClick={() => setSelected("cmd")}
            opacity={selected === "cmd" ? 1 : 0.6}
          >
            <CardTitle size="md">Command</CardTitle>
            <Text color="grey">
              Runs a command or a series of commands in the command line.
            </Text>
          </Card>
        </SimpleGrid>

        {renderForm()}

        {/*<Stack>*/}
        {/*  <Select*/}
        {/*    value={type}*/}
        {/*    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>*/}
        {/*      setType(e.target.value)*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {actions.map((action) => (*/}
        {/*      <option value={action} key={action}>*/}
        {/*        {capitalize(action)}*/}
        {/*      </option>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*  <Input*/}
        {/*    value={name}*/}
        {/*    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
        {/*      setName(e.target.value)*/}
        {/*    }*/}
        {/*    placeholder="Add a name for your action!"*/}
        {/*  />*/}
        {/*  <Input*/}
        {/*    value={description}*/}
        {/*    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
        {/*      setDescription(e.target.value)*/}
        {/*    }*/}
        {/*    placeholder="Give a brief description for your action."*/}
        {/*  />*/}
        {/*  <Input*/}
        {/*    value={path}*/}
        {/*    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>*/}
        {/*      setPath(e.target.value)*/}
        {/*    }*/}
        {/*    placeholder="Provide a path for this action."*/}
        {/*  />*/}
        {/*  <Input type="file" name="file" onChange={handleFileChange} />*/}
        {/*  <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>*/}
        {/*    {({ getRootProps, getInputProps }) => (*/}
        {/*      <section>*/}
        {/*        <div {...getRootProps()}>*/}
        {/*          <input {...getInputProps()} />*/}
        {/*          <p>Drag 'n' drop some files here, or click to select files</p>*/}
        {/*        </div>*/}
        {/*      </section>*/}
        {/*    )}*/}
        {/*  </Dropzone>*/}
        {/*  <Button variantColor="blue" onClick={handleSubmit}>*/}
        {/*    Submit*/}
        {/*  </Button>*/}
        {/*</Stack>*/}
      </Box>
    </Center>
  );
};

export default hot(module)(NewAction);
