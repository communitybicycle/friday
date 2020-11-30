import React, { FocusEventHandler, FunctionComponent } from "react";
import {
  Box,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/core";
import { getItem, setItem } from "../utils/storage";

interface IProps {
  id: string;
  text: string;
}

const PageHeader: FunctionComponent<IProps> = ({ id, text }) => {
  const headerId = "header." + id;

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setItem(headerId, e.target.value);
  };

  return (
    <Box mb={8}>
      <Editable
        fontSize="5xl"
        fontWeight="bold"
        defaultValue={getItem(headerId) || text}
      >
        <EditablePreview />
        <EditableInput onBlur={handleBlur} />
      </Editable>
      <Divider />
    </Box>
  );
};

export default PageHeader;
