import React from "react";
import "./HomeScreen.css";
import { useNavigate } from "react-router-dom";
function FirstScreen() {
  const history = useNavigate();
  const setScreen = () => {};

  return (
    <div className="block-chain-icon">
      <div >
        <img
          className="loginScreen__logo"
          src="https://cdn.pixabay.com/photo/2017/12/26/21/43/blockchain-3041480__340.jpg"
          alt=""
        />
        <button className="loginScreen__button" onClick={() => history("/login")}>Sign In</button>

        <div className="loginScreen__gradient" />
      </div>
      <div className="loginScreen__body">
        {" "}
        <h1>Lets come together, buy some cryptocurrencies here.</h1>
        <h2>buy anywhere. sell at any time.</h2>
        <h3>
          Ready to buy or sell? Enter your details here to create your account.
        </h3>
        <div className="loginScreen__input">
          <button
            className="loginScreen__getStarted"
            onClick={() => history("/SignUp")}
          >
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
}

export default FirstScreen;
