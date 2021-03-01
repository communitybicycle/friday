import { Button, useToast } from "@chakra-ui/core";
import { ipcRenderer } from "electron";
import React, { Fragment } from "react";
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux";
import { reinitializeSettingsReducer } from "reducers/settingReducer";
import { reinitializeDataReducer } from "reducers/dataReducer";
import { reinitializeMetaReducer } from "reducers/metaReducer";
import { RootState } from "reducers/store";
import { reinitializeUserReducer } from "reducers/userReducer";
import Item from "./Item";

const DataSettings: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state);

  const exportData = async () => {
    const { success } = await ipcRenderer.invoke(
      "save-file",
      JSON.stringify(data)
    );

    if (!success) {
      toast({
        status: "error",
        duration: 7000,
        position: "bottom",
        title: "Unable to export data :(",
      });
    }
  };

  const importData = async () => {
    const { success, data } = await ipcRenderer.invoke("upload-file");

    if (success && data) {
      const newData = JSON.parse(data);
      dispatch(reinitializeDataReducer(newData));
    }
  };

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

  const resetSettingsReducer = () => {
    dispatch(reinitializeSettingsReducer());
    toast({
      status: "success",
      duration: 7000,
      position: "bottom",
      title: "Settings has been re-initialized!",
    });
  };

  return (
    <Fragment>
      <Item
        name="Export data"
        description="Downloads the user's data in a JSON file."
      >
        <Button variantColor="blue" onClick={exportData}>
          Export
        </Button>
      </Item>
      <Item
        name="Import data"
        description="Upload a data file to restore an old dataset."
      >
        <Button variantColor="green" onClick={importData}>
          Import
        </Button>
      </Item>
      <Item
        name="Reset data"
        description="Resets only the modules, actions, and instructions."
      >
        <Button variantColor="red" onClick={resetDataReducer}>
          Reset
        </Button>
      </Item>
      <Item name="Reset meta" description="Resets only the meta data.">
        <Button variantColor="red" onClick={resetMetaReducer}>
          Reset
        </Button>
      </Item>
      <Item name="Reset user" description="Resets only the user data.">
        <Button variantColor="red" onClick={resetUserReducer}>
          Reset
        </Button>
      </Item>
      <Item name="Reset settings" description="Resets only the settings data.">
        <Button variantColor="red" onClick={resetSettingsReducer}>
          Reset
        </Button>
      </Item>
    </Fragment>
  );
};

export default hot(module)(DataSettings);
