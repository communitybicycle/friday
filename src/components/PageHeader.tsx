import React, { FocusEventHandler } from "react";
import { hot } from "react-hot-loader";
import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
} from "@chakra-ui/core";
import { getItem, setItem } from "../utils/storage";

interface IProps {
  id: string;
  text: string;
  buttonAction?: () => void;
  buttonText?: string;
  pageAction?: () => void;
}

const PageHeader: React.FC<IProps> = ({
  id,
  text,
  buttonAction,
  buttonText,
  pageAction,
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
        <Box>
          {buttonAction && buttonText && (
            <Button variantColor="blue" onClick={buttonAction}>
              {buttonText}
            </Button>
          )}
          {pageAction && (
            <IconButton
              aria-label="edit page"
              icon="settings"
              onClick={pageAction}
              variant="ghost"
            />
          )}
        </Box>
      </Flex>
      <Divider />
    </Box>
  );
};

export default hot(module)(PageHeader);
