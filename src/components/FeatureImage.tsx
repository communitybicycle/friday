import { Button, Image, PseudoBox, useToast } from "@chakra-ui/core";
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { updateFeatureImage } from "../reducers/dataReducer";
import { DEFAULT_IMAGE_URL } from "../data/constants";

interface Props {
  imgSrc?: string;
  id: string;
}

const FeatureImage: React.FC<Props> = ({ imgSrc, id }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleClick = async () => {
    const result = await ipcRenderer.invoke("store-image-file");

    if (result !== "No file selected!") {
      const newImage = "safe-file-protocol://" + result;
      dispatch(
        updateFeatureImage({ imgSrc: newImage, id, type: "dashboards" })
      );
      toast({
        title: "Feature image updated successfully!",
        duration: 7000,
        isClosable: true,
        status: "success",
      });
    }
  };

  return (
    <PseudoBox
      position="relative"
      _hover={
        {
          "& > button": {
            opacity: 1,
          },
        } as any
      }
    >
      <Image
        height="300px"
        width="100%"
        objectFit="cover"
        src={imgSrc || DEFAULT_IMAGE_URL}
        alt=""
      />
      <Button
        position="absolute"
        bottom={2}
        right={2}
        size="xs"
        opacity={0}
        onClick={handleClick}
      >
        Upload Image
      </Button>
    </PseudoBox>
  );
};

export default hot(module)(FeatureImage);
