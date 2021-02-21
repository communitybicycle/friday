import {
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
import PluginsSettings from "components/settings/Plugins";
import React from "react";
import { hot } from "react-hot-loader";
import DataSettings from "./settings/Data";
import PersonalSettings from "./settings/Personal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<Props> = ({ onClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={8} p={4} minH="600px">
        <Heading size="lg" mb={3}>
          Settings
        </Heading>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Personal</Tab>
            <Tab>Plugins</Tab>
            <Tab>Data</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PersonalSettings />
            </TabPanel>
            <TabPanel>
              <PluginsSettings />
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
