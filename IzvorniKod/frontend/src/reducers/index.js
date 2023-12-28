import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import admin from "./admin";
import learningSpecsReducer from "./learningSpecs";
import autofillReducer from "./autofill";
import mode12Reducer from "./mode12";

export default combineReducers({
  auth,
  profile,
  admin,
  learningSpecsReducer,
  autofillReducer,
  mode12Reducer,
});
