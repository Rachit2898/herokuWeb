import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpScreen.css";
import { sessionManager } from "../managers/sessionManager";
import UserModules from "../services/user";
import ToastService from "react-material-toast";
import swal from "sweetalert";
function LogInScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setErrorEmail] = useState("");
  const [passwordError, setErrorPassword] = useState("");
  const history = useNavigate();
  var regExAlphaNum = /^[0-9a-zA-Z]+$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

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

  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    console.log("clicked");
    const data = {
      email: email,
      password: password,
    };
    if (!email) {
      setErrorEmail("Please enter required field");

      return;
    } else if (!password) {
      setErrorPassword("Please enter required field");

      return;
    } else if (!email.match(mailformat)) {
      setErrorEmail("Enter valid Username");

      return;
    } else if (!password.match(regExPass)) {
      setErrorPassword(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );

      return;
    }
    const  response = await parseResponse(UserModules.signin(data));
   
    console.log(response[1].user);
    if (response[1].successCode == 200) {
      apiSuccessToast("Success", response.message);

      sessionManager.setDataInLocalStorage("userInfo", response[1].user.name);
      sessionManager.setDataInLocalStorage("userEmail", response[1].user.email);
      sessionManager.setDataInLocalStorage("isLoggedIn", true);
      sessionManager.setDataInLocalStorage("userId",response[1].user._id );
      sessionManager.setDataInLocalStorage("token",response[1].token );
      sessionManager.setDataInLocalStorage("pic",response[1].user.profilePic );

      window.location.reload()
      history("/wallet");
    } else {
      apiFailureToast("Failed",response.message);
    }
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
        <div className="LogIn__body">
          <div className="signUpScreen">
            <form>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorEmail("");
                }}
                placeholder="Email"
                type="email"
              ></input>
              <div>{emailError}</div>
              <br />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
                placeholder="Password"
                type="password"
              ></input>
              <div>{passwordError}</div>
              <br />

              <button onClick={handleSubmit}>Login</button>
              <h4>
                <span class="signUpScreen__span">New User?</span>
                <span
                  class="signUpScreen__signUpLink"
                  onClick={() => history("/signup")}
                >
                  Sign Up Now.
                </span>
              </h4>
            </form>
          </div>
        </div>

        <div className="loginScreen__gradient" />

        <div className="formData"></div>
      </div>
    </div>
  );
}

export default LogInScreen;
