import { Box, IconButton, useColorMode } from "@chakra-ui/core";
import { WINDOW_BAR_HEIGHT } from "data/constants";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { closeMenu, openMenu } from "reducers/metaReducer";
import { RootState } from "reducers/store";

interface Props {
  path: string;
  component: React.FC;
  noPadding?: boolean;
  notExact?: boolean;
  noScroll?: boolean;
}

const Page: React.FC<Props> = ({
  noPadding,
  path,
  component,
  notExact,
  noScroll,
}) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };

  const { isMenuOpen } = useSelector((state: RootState) => state.meta);

  const handleMenuChange = () => {
    if (isMenuOpen) {
      dispatch(closeMenu());
    } else {
      dispatch(openMenu());
    }
  };

  const render = (Component: React.FC) => <Component />;

  return (
    <Route
      exact={!notExact}
      path={path}
      component={() => (
        <Box
          position="relative"
          height="100%"
          minH={`calc(100vh - ${WINDOW_BAR_HEIGHT})`}
        >
          <IconButton
            icon={isMenuOpen ? "arrow-left" : "arrow-right"}
            aria-label="open and close menu"
            variantColor="blue"
            variant="ghost"
            onClick={handleMenuChange}
            position="absolute"
            top={2}
            left={2}
            zIndex={50}
          />
          {noScroll ? (
            <Box
              pt={noPadding ? "0px" : "50px"}
              px={noPadding ? "0px" : "50px"}
              bg={bgColor[colorMode]}
              height="100%"
            >
              {render(component)}
            </Box>
          ) : (
            <Scrollbars height="100%" width="100%">
              <Box
                pt={noPadding ? "0px" : "50px"}
                px={noPadding ? "0px" : "50px"}
                bg={bgColor[colorMode]}
                height="100%"
              >
                {render(component)}
              </Box>
            </Scrollbars>
          )}
        </Box>
      )}
    />
  );
};

export default hot(module)(Page);
