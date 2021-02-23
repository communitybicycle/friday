import { combineReducers } from "redux";
import settingReducer from "reducers/settingReducer";
import dataReducer from "reducers/dataReducer";
import metaReducer from "reducers/metaReducer";
import userReducer from "reducers/userReducer";

export const rootReducer = combineReducers({
  data: dataReducer,
  meta: metaReducer,
  user: userReducer,
  settings: settingReducer,
});
