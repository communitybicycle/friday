import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { Box, Divider, Heading, IconButton, PseudoBox } from "@chakra-ui/core";
import Text from "../modules/Text";
import Notes from "../modules/Notes";
import Automations from "../modules/Automations";
import EditModuleModal from "./EditModuleModal";

interface IProps {
  data: any;
}

const Module: React.FC<IProps> = ({ data }) => {
  const editModule = () => {};

  const renderModule = () => {
    switch (data.type) {
      case "text":
        return <Text data={data} />;
      case "notes":
        return <Notes data={data} />;
      case "automations":
        return <Automations data={data} />;
      default:
        return;
    }
  };

  return (
    <Box mb={4}>
      {!data.hideHeader && (
        <Fragment>
          <PseudoBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            _hover={{ "& > button#page-action": { opacity: 1 } } as any}
          >
            <Heading fontSize="2xl">{data.header}</Heading>
            <EditModuleModal module={data} />
          </PseudoBox>
          <Divider />
        </Fragment>
      )}
      {renderModule()}
    </Box>
  );
};

export default hot(module)(Module);
