import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  PseudoBox,
} from "@chakra-ui/core";
import React, { FocusEventHandler } from "react";
import { hot } from "react-hot-loader";
import { setItem } from "utils/storage";

interface IProps {
  id: string;
  text: string;
  buttonAction?: () => void;
  buttonText?: string;
  pageAction?: () => void;
  isDisabled?: boolean;
}

const PageHeader: React.FC<IProps> = ({
  id,
  text,
  buttonAction,
  buttonText,
  pageAction,
  isDisabled,
}) => {
  const headerId = "header." + id;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setItem(headerId, e.target.value);
  };

  return (
    <Box mb={8}>
      <PseudoBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        _hover={{ "& > div > button#page-action": { opacity: 1 } } as any}
      >
        <Editable
          fontSize="5xl"
          fontWeight="bold"
          defaultValue={text}
          isDisabled={isDisabled}
          isPreviewFocusable={!isDisabled}
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
              id="page-action"
              aria-label="edit page"
              icon="settings"
              onClick={pageAction}
              variantColor="blue"
              variant="ghost"
              opacity={0}
            />
          )}
        </Box>
      </PseudoBox>
      <Divider />
    </Box>
  );
};

export default hot(module)(PageHeader);
