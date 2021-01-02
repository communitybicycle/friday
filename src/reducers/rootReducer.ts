import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import metaReducer from "./metaReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
  data: dataReducer,
  meta: metaReducer,
  user: userReducer,
});
