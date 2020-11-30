import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import Automations from "./pages/automations/Automations";
import NewAutomation from "./pages/automations/NewAutomation";

const Router: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/notes" component={Notes} />
      <Route path="/automations/new" component={NewAutomation} />
      <Route path="/automations" component={Automations} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default Router;
