import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { Box, Divider, Heading, IconButton, PseudoBox } from "@chakra-ui/core";
import Text from "../modules/Text/Text";
import Notes from "../modules/Notes/Notes";
import Automations from "../modules/Automations/Automations";
import { ModulesType } from "../types/modules";
import { useDispatch } from "react-redux";
import {
  openEditModuleModal,
  setEditModuleModal,
} from "../reducers/metaReducer";

interface Props {
  module: ModulesType;
}

const Module: React.FC<Props> = ({ module }) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setEditModuleModal(module));
    dispatch(openEditModuleModal());
  };

  const renderModule = () => {
    switch (module.type) {
      case "text":
        return <Text module={module} />;
      case "notes":
        return <Notes module={module} />;
      case "automations":
        return <Automations module={module} />;
      default:
        return;
    }
  };

  return (
    <Box mb={4}>
      {!module.hideHeader && (
        <Fragment>
          <PseudoBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            _hover={{ "& > button#page-action": { opacity: 1 } } as any}
          >
            <Heading fontSize="2xl">{module.header}</Heading>
            <IconButton
              id="page-action"
              aria-label="edit module"
              icon="settings"
              onClick={handleOpen}
              variantColor="ghostGray"
              variant="ghost"
              opacity="0"
            />
          </PseudoBox>
          <Divider />
        </Fragment>
      )}
      {renderModule()}
    </Box>
  );
};

export default hot(module)(Module);
