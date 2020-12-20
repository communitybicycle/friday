import React, { FocusEventHandler } from "react";
import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
} from "@chakra-ui/core";
import { getItem, setItem } from "../utils/storage";

interface IProps {
  id: string;
  text: string;
  buttonAction?: () => void;
  buttonText?: string;
}

const PageHeader: React.FC<IProps> = ({
  id,
  text,
  buttonAction,
  buttonText,
}) => {
  const headerId = "header." + id;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setItem(headerId, e.target.value);
  };

  return (
    <Box mb={8}>
      <Flex align="center" justify="space-between">
        <Editable
          fontSize="5xl"
          fontWeight="bold"
          defaultValue={getItem(headerId) || text}
        >
          <EditablePreview />
          <EditableInput onBlur={handleBlur} />
        </Editable>
        {buttonAction && buttonText && (
          <Button variantColor="blue" onClick={buttonAction}>
            {buttonText}
          </Button>
        )}
      </Flex>
      <Divider />
    </Box>
  );
};

export default PageHeader;
