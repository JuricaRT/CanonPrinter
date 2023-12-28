import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./hocs/Layout";

import Homepage from "./containers/Homepage";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import PassChange from "./containers/PassChange";
import MainScreen from "./containers/MainScreen";
import ProfileSettings from "./containers/ProfileSettings";
import LearningSite from "./containers/LearningSite";

import store from "./store";
import { Provider } from "react-redux";
import ModifyUsers from "./containers/ModifyUsers";
import ModifyDictionaries from "./containers/ModifyDictionaries";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/passChange" element={<PassChange />} />
          <Route exact path="/mainScreen" element={<MainScreen />} />
          <Route exact path="/modifyUsers" element={<ModifyUsers />} />
          <Route exact path="/profileSettings" element={<ProfileSettings />} />
          <Route exact path="/learning" element={<LearningSite />} />
          <Route
            exact
            path="/modifyDictionaries"
            element={<ModifyDictionaries />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </Provider>
);

export default App;
