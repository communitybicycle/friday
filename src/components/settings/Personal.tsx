import { Button, Flex, Image, Switch, useColorMode } from "@chakra-ui/core";
import Center from "components/layout/Center";
import { ipcRenderer } from "electron";
import React, { Fragment, useState } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers/store";
import { setProfilePicture } from "reducers/userReducer";
import { eStore } from "utils/eStore";
import Item from "./Item";

const PersonalSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { profilePicture } = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState("");
  const [oldImage] = useState(profilePicture);

  const handleColorModeChange = () => {
    eStore.set("colorMode", colorMode === "light" ? "dark" : "light");
    toggleColorMode();
  };

  const handleUploadImage = async () => {
    const result = await ipcRenderer.invoke("store-image-file");

    if (result !== "No file selected!" && result !== profilePicture) {
      const newImage = "safe-file-protocol://" + result;
      dispatch(setProfilePicture(newImage));
      setImage(newImage);
    }
  };

  const handleDeleteImage = () => {
    setImage("");
    dispatch(setProfilePicture(oldImage));
  };

  return (
    <Fragment>
      <Item
        name="Change profile picture"
        description="Uploading a new picture replaces the image in the navbar."
      >
        <Flex>
          <Button onClick={handleUploadImage} mr={2}>
            Upload
          </Button>
          {image && (
            <Button variantColor="red" onClick={handleDeleteImage}>
              Delete
            </Button>
          )}
        </Flex>
      </Item>
      {image && (
        <Center>
          <Image src={image} alt="" height={200} mb={2} />
        </Center>
      )}
      <Item
        name="Dark Mode"
        description="Switches the application between light mode and dark mode."
      >
        <Switch
          isChecked={colorMode === "dark"}
          onChange={handleColorModeChange}
        />
      </Item>
    </Fragment>
  );
};

export default hot(module)(PersonalSettings);
