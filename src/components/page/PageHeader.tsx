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
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "reducers/dataReducer";
import { RootState } from "reducers/store";
import { PageType } from "types/page";

interface Props {
  id: string;
  type?: PageType;
  text?: string;
  buttonAction?: () => void;
  buttonText?: string;
  pageAction?: () => void;
  isDisabled?: boolean;
}

const PageHeader: React.FC<Props> = ({
  id,
  type,
  text,
  buttonAction,
  buttonText,
  pageAction,
  isDisabled,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state);
  const title = type ? data[type][id].title : "";

  const handleChange = (val: string) => {
    if (!text && type) {
      dispatch(setTitle({ id, newTitle: val, pageType: type }));
    }
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
          value={text || title}
          isDisabled={isDisabled}
          isPreviewFocusable={!isDisabled}
          onChange={handleChange}
          width="100%"
        >
          <EditablePreview isTruncated />
          <EditableInput />
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
