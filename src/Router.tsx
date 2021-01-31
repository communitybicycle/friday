import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";
import Instructions from "./pages/instructions/Instructions";
import NewInstruction from "./pages/instructions/NewInstruction";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import Actions from "./pages/actions/Actions";
import NewAction from "./pages/actions/NewAction";
import Page from "./components/Page";
import Welcome from "./pages/Welcome";

const Router: FunctionComponent = () => {
  return (
    <Switch>
      <Page path="/notes/:id" component={Notes} />
      <Page path="/actions/new" component={NewAction} />
      <Page path="/actions" component={Actions} />
      <Page path="/instructions/new" component={NewInstruction} />
      <Page path="/instructions" component={Instructions} />
      <Page path="/dashboard/:id" component={Dashboard} noPadding />
      <Page path="/" component={Welcome} notExact />
    </Switch>
  );
};

export default Router;
