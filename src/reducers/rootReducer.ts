import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import metaReducer from "./metaReducer";

export const rootReducer = combineReducers({
  data: dataReducer,
  meta: metaReducer,
});
