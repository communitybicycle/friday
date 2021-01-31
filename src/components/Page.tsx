import React from "react";
import { hot } from "react-hot-loader";
import { Box, IconButton } from "@chakra-ui/core";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { closeMenu, openMenu } from "../reducers/metaReducer";

interface Props {
  path: string;
  component: React.FC;
  noPadding?: boolean;
  notExact?: boolean;
}

const Page: React.FC<Props> = ({ noPadding, path, component, notExact }) => {
  const dispatch = useDispatch();
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
        <Box position="relative">
          <IconButton
            icon={isMenuOpen ? "arrow-left" : "arrow-right"}
            aria-label="open and close menu"
            variantColor="blue"
            variant="ghost"
            onClick={handleMenuChange}
            position="absolute"
            top={2}
            left={2}
          />
          <Box pt={noPadding ? "0px" : "50px"} px={noPadding ? "0px" : "50px"}>
            {render(component)}
          </Box>
        </Box>
      )}
    />
  );
};

export default hot(module)(Page);
