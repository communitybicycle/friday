import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import Automations from "./pages/automations/Automations";
import NewAutomation from "./pages/automations/NewAutomation";
import Page from "./components/Page";
import Welcome from "./pages/Welcome";

const Router: FunctionComponent = () => {
  return (
    <Switch>
      <Page path="/notes" component={Notes} />
      <Page path="/automations/new" component={NewAutomation} />
      <Page path="/automations" component={Automations} />
      <Page path="/dashboard/:id" component={Dashboard} noPadding />
      <Page path="/" component={Welcome} />
    </Switch>
  );
};

export default Router;
