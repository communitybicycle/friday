import React, { useEffect } from "react";
import { hot } from "react-hot-loader";
import { useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { eStore } from "../utils/eStore";

const ElectronStoreSynchronizer: React.FC = () => {
  const { data, meta, user } = useSelector((state: RootState) => state);

  useEffect(() => {
    eStore.set("data", data);
  }, [data]);

  useEffect(() => {
    eStore.set("meta", meta);
  }, [meta]);

  useEffect(() => {
    eStore.set("user", user);
  }, [user]);

  return <></>;
};

export default hot(module)(ElectronStoreSynchronizer);
