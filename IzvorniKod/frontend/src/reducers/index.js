import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import admin from "./admin";
import learningSpecsReducer from "./learningSpecs";
import autofillReducer from "./autofill";

export default combineReducers({
  auth,
  profile,
  admin,
  learningSpecsReducer,
  autofillReducer
});
