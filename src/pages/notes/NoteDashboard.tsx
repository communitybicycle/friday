import NoteSubMenu from "pages/notes/NoteSubMenu";
import React from "react";
import { hot } from "react-hot-loader";

const NoteDashboard: React.FC = () => {
  return <NoteSubMenu>Dashboard</NoteSubMenu>;
};

export default hot(module)(NoteDashboard);
