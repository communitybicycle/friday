import { Button, LightMode, useToast } from "@chakra-ui/core";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { useDispatch } from "react-redux";
import { reinitializeMetaReducer } from "../../reducers/metaReducer";
import { reinitializeUserReducer } from "../../reducers/userReducer";
import { reinitializeDataReducer } from "../../reducers/dataReducer";
import Item from "./Item";

const DataSettings: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const resetDataReducer = () => {
    dispatch(reinitializeDataReducer());
    toast({
      status: "success",
      duration: 7000,
      position: "bottom",
      title: "Data has been re-initialized!",
    });
  };

  const resetMetaReducer = () => {
    dispatch(reinitializeMetaReducer());
    toast({
      status: "success",
      duration: 7000,
      position: "bottom",
      title: "Meta data has been re-initialized!",
    });
  };

  const resetUserReducer = () => {
    dispatch(reinitializeUserReducer());
    toast({
      status: "success",
      duration: 7000,
      position: "bottom",
      title: "User has been re-initialized!",
    });
  };

  return (
    <Fragment>
      <Item
        name="Reset data"
        description="Resets only the modules, actions, and instructions"
      >
        <LightMode>
          <Button variantColor="red" onClick={resetDataReducer}>
            Reset
          </Button>
        </LightMode>
      </Item>
      <Item name="Reset meta" description="Resets only the meta data">
        <LightMode>
          <Button variantColor="red" onClick={resetMetaReducer}>
            Reset
          </Button>
        </LightMode>
      </Item>
      <Item name="Reset user" description="Resets only the user data">
        <LightMode>
          <Button variantColor="red" onClick={resetUserReducer}>
            Reset
          </Button>
        </LightMode>
      </Item>
    </Fragment>
  );
};

export default hot(module)(DataSettings);
