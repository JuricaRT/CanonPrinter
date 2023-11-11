import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PassChange from "./pages/PassChange";
import MainScreen from "./pages/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="passChange" element={<PassChange />}></Route>
        <Route path="mainScreen" element={<MainScreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
