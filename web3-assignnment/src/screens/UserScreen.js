import React, { useState, useEffect } from "react";
import { sessionManager } from "../managers/sessionManager";
import "./UseScreen.css";
// import "./HomeScreen.css";

import { useNavigate } from "react-router-dom";
import AddressCard from "./AddressInfo";
function FirstScreen(props) {
  const image = sessionManager.getDataFromLocalStorage("pic");
  const dataCookies = sessionManager.getDataFromLocalStorage("userInfo");
  const [img, _setImg] = useState("");
  const setImg = () => {
    if (!image) {
      _setImg(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
      );
    } else {
      _setImg(
        image
      );
    }
  };

  useEffect(() => {
    setImg(img);
  }, [image]);
  console.log(props,"propsee")
  const history = useNavigate();
  const setScreen = () => {};

  return (
    <div className="address-chain-icon">
      <div>

        <img
          className="loginScreen__logo"
          onClick={() => history("/")}
          src="https://cdn.pixabay.com/photo/2017/12/26/21/43/blockchain-3041480__340.jpg"
          alt=""
        />
        <h1 className="user_name">Hi, {dataCookies}</h1>
        <button className="loginScreen__button">
          <img
            className="avtar__logo"
            src={img}
            alt=""
            onClick={() => history("/profile")}
          ></img>
        </button>

        <div className="addressScreen__gradient">
          <div className="userPost">
            <AddressCard/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstScreen;
