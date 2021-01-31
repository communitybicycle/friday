import {
  Divider,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/core";
import React from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { closeSettings } from "../reducers/metaReducer";
import { RootState } from "../reducers/store";
import DataSettings from "./settings/Data";
import PersonalSettings from "./settings/Personal";

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { isSettingsOpen } = useSelector((state: RootState) => state.meta);

  const handleClose = () => {
    dispatch(closeSettings());
  };

  return (
    <Modal isOpen={isSettingsOpen} onClose={handleClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={8} p={4} minH="600px">
        <Heading size="lg" mb={3}>
          Settings
        </Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Personal</Tab>
            <Tab>Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PersonalSettings />
            </TabPanel>
            <TabPanel>
              <DataSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

export default hot(module)(Settings);
