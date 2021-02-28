import { Box, Flex, Heading, useColorMode } from "@chakra-ui/core";
import Container from "components/layout/Container";
import NoteFolderItem from "components/NoteFolderItem";
import NoteNavItem from "components/NoteNavItem";
import {
  NAVBAR_BORDER_COLOR,
  NAVBAR_WIDTH,
  WINDOW_BAR_HEIGHT,
} from "data/constants";
import React from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "reducers/store";
import { NoteOrFolderMenuItem } from "types/page";

const NoteSubMenu: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();
  const history = useHistory();
  const { notes, noteMenu } = useSelector((state: RootState) => state.data);

  const renderMenuItem = (item: NoteOrFolderMenuItem) => {
    if (item.type === "note") {
      return (
        <NoteNavItem
          to={`/notes/${item.id}`}
          key={item.id}
          text={notes[item.id].title}
        />
      );
    } else {
      return (
        <NoteFolderItem text={item.title}>
          {item.subItems?.map((subItem) => renderMenuItem(subItem))}
        </NoteFolderItem>
      );
    }
  };

  return (
    <Flex>
      <Box
        bg={colorMode === "light" ? "gray.100" : "#232a38"}
        minWidth={`${NAVBAR_WIDTH}px`}
        maxWidth={`${NAVBAR_WIDTH}px`}
        height={`calc(100vh - ${WINDOW_BAR_HEIGHT}px)`}
        px="20px"
        pt="56px"
        // boxShadow="7px 0 16px -6px rgba(0, 0, 0, 0.16)"
        borderRight={
          colorMode === "light"
            ? "1px solid #ececec"
            : `1px solid ${NAVBAR_BORDER_COLOR}`
        }
      >
        <Heading
          size="lg"
          onClick={() => history.push("/notes")}
          cursor="pointer"
          mb={2}
        >
          Notes
        </Heading>
        {noteMenu.map((item) => renderMenuItem(item))}
      </Box>
      <Box pt="50px" px="50px" flex={1}>
        <Container>{children}</Container>
      </Box>
    </Flex>
  );
};

export default hot(module)(NoteSubMenu);
