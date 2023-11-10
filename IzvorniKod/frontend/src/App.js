import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React from "react";

export default function App() {
  return (
    <div className="container">
      <LogSignButtons />
      <Message></Message>
      <Reviews></Reviews>
    </div>
  );
}

function LogSignButtons() {
  return (
    <div className="buttons">
      <Button style={{}}>Log in</Button>
      <Button>Sign up</Button>
    </div>
  );
}

function Reviews() {
  return (
    <div className="reviews">
      <Review>Jedna od najboljih aplikacija za učenje stranih jezika</Review>
      <Review>
        Nakon 6 mjeseci učenja sam prošao ispit i dobio posao u Njemačkoj{" "}
      </Review>
    </div>
  );
}

function Button({ children }) {
  if (children === "Log in") {
    return <button className="button1">{children}</button>;
  }
  return <button className="button2">{children}</button>;
}

function Message() {
  return (
    <div className="openingMessage">
      <div className="pictureAndMessage">
        Dobrodošli na najbolje mjesto za učenje stranih jezika!
      </div>
    </div>
  );
}

function Review({ children }) {
  return (
    <div className="review">
      <div className="reviewChildren">{children}</div>
      <div className="reviewPerson">Anonymus ⭐⭐⭐⭐⭐</div>
    </div>
  );
}
