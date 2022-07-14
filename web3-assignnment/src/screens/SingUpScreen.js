import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpScreen.css";
import { sessionManager } from "../managers/sessionManager";
import UserModules from "../services/user";
import ToastService from "react-material-toast";
function SecondScreen() {
  const history = useNavigate();

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

  var regExAlphaNum = /^[0-9a-zA-Z]+$/;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var regExPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;

  const [nameError, setErrorName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setErrorEmail] = useState("");
  const [passwordError, setErrorPassword] = useState("");
  const [confirmPasswordError, setErrorConfirmPassword] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  

  const handleSignUp = async (e) => {
    console.log("clicked on signup");
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
    console.log(data);

    setErrorName("");
    setErrorEmail("");
    setPhoneError("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    if (!email) {
      setErrorEmail("Please enter required field");
      
      return;
    }
    else if (!name) {
      setErrorName("Please enter required field");
     
      return;
    }
     else if (!password) {
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
    else if (password !== confirmPassword) {
      setErrorConfirmPassword("Password doesn't match");
      
    } 

    
  const  response = await parseResponse(UserModules.signUp(data));
    console.log(response[1]);
    if (response[1].success==true) {
      apiSuccessToast("Success", response[1].message);

      
      history("/login");
    } else {
      apiFailureToast(response[1].message);
    }
  };

  const setScreen = () => {};

  

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
          <div className="signUpScreen">
            <form>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorName("");
                }}
                placeholder="Name"
                type="text"
              ></input>
            <div>{nameError}</div>  
              <br />
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneError("");
                }}
                placeholder="Phone"
                type="phone"
              ></input>
              <br />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorEmail("");
                }}
                placeholder="Email"
                type="email"
              ></input>
              <div>{emailError}</div>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
                placeholder="Password"
                type="password"
              ></input>
              <br />
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorConfirmPassword("")
                }}
                placeholder="Confirm Password"
                type="password"
              ></input>
              <br />
              <button onClick={handleSignUp}>
                Resiter
              </button>
              <h4>
                <span class="signUpScreen__span">Already User? </span>
                <span class="signUpScreen__signUpLink">Sign In Now.</span>
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

export default SecondScreen;

