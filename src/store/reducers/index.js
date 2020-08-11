import campaignReducer from "./campaignReducer";
import languageReducer from "./langReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
  campaigns: campaignReducer,
  language: languageReducer
});

export default reducers;
