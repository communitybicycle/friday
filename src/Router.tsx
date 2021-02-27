import Page from "components/page/Page";
import Actions from "pages/actions/Actions";
import Calendar from "pages/Calendar";
import Dashboard from "pages/Dashboard";
import Instructions from "pages/instructions/Instructions";
import NoteDashboard from "pages/notes/NoteDashboard";
import Notes from "pages/notes/Notes";
import Terminal from "pages/Terminal";
import Welcome from "pages/Welcome";
import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";

const Router: FunctionComponent = () => {
  return (
    <Switch>
      <Page path="/notes/:id" component={Notes} noPadding />
      <Page path="/notes" component={NoteDashboard} noPadding />
      <Page path="/terminal" component={Terminal} />
      <Page path="/calendar" component={Calendar} />
      <Page path="/actions" component={Actions} />
      <Page path="/instructions" component={Instructions} />
      <Page path="/dashboard/:id" component={Dashboard} noPadding />
      <Page path="/" component={Welcome} notExact />
    </Switch>
  );
};

export default Router;
