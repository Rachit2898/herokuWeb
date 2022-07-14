import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionManager } from "../managers/sessionManager";
import UserModules from "../services/user";
import ToastService from "react-material-toast";
import "./ProfileScreen.css";

const toast = ToastService.new({
  place: "topRight",
  duration: 3,
  maxCount: 5,
});

const apiFailureToast = (message) => {
  toast.error(message ? message : "apiConstant.API_FAILURE");
};

const apiSuccessToast = (msg) => {
  toast.success(msg ? msg : "apiConstant.API_SUCCESS");
};

const dataCookies = sessionManager.getDataFromLocalStorage("userEmail");
console.log(dataCookies)

function SecondScreen() {
  const history = useNavigate();
  const image = sessionManager.getDataFromLocalStorage("pic");;

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
  const logout = () => {
    sessionManager.removeDataFromLocalStorage("userInfo");
    sessionManager.removeDataFromLocalStorage("isLoggedIn");
    sessionManager.removeDataFromLocalStorage("pic");
    apiSuccessToast("Logged out successfully");
    history("/");
    window.location.reload();
    
  };

  return (
    <div className="block-chain-icon">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          onClick={() => history("/")}
          src="https://cdn.pixabay.com/photo/2017/12/26/21/43/blockchain-3041480__340.jpg"
          alt=""
        />

        <div className="signUpScreen__body">
          <div className="profileScreen">
            <div className="profileScreen__body">
              <h1>User Profile</h1>
              <div className="profileScreen__info">
                <img src={img} alt="" />
                <div className="profileScreen__details">
                  <h2>{dataCookies}</h2>
                  <div className="profileScreen__plans">
                    <button onClick={logout} className="profileScreen__signOut">
                      Sign Out
                    </button>
                  </div>
                  <h3>Are you want to edit this profile?</h3>
                  <div className="loginScreen__input">
                    <button
                      className="loginScreen__getStarted"
                      onClick={() => history("/editprofile")}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="loginScreen__gradient" />
      </div>
    </div>
  );
}

export default SecondScreen;
