import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserModules from "../services/user";
import { sessionManager } from "../managers/sessionManager";

import ToastService from "react-material-toast";
import "./EditProfile.css";
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

function EditProfileScreen() {
  const history = useNavigate();

  const [images, setImages] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };

  const image = sessionManager.getDataFromLocalStorage("pic");

  const [img, _setImg] = useState("");

  const setImg = () => {
    if (!image) {
      _setImg(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
      );
    } else {
      _setImg(image);
    }
  };

  useEffect(() => {
    setImg(img);
  }, [image]);

  const uploadPic = async () => {
    const data = new FormData();
    data.append("file", images);

    let response = await parseResponse(UserModules.updatePic(data));

    if (response[1].successCode === 200) {
      apiSuccessToast("Pic uploaded successfully");

      sessionManager.setDataInLocalStorage("pic", response[1].path);
    } else {
      apiFailureToast("Pic not uploaded");
    }
  };

  const updateProfile = async() => {
    const data = {
      name: name,
      email: email,
      password: password,
      profilePic: img,
    };
    if (!email.match(mailformat)) {
      setErrorEmail("Enter valid Username");

      return;
    } 
     if (!password.match(regExPass)) {
      setErrorPassword(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );

      return;
    }
    else if (password!==confirmPassword) {
      setErrorConfirmPassword(
        "Password must be atleast 5 character long with Uppercase, Lowercase and Number"
      );

      return;
    }
    const  response = await parseResponse(UserModules.updateProfile(data));
    if (response[1].successCode == 200) {
      apiSuccessToast("Success", response.message);

      sessionManager.setDataInLocalStorage("userInfo", response[1].user.name);
      sessionManager.setDataInLocalStorage("userEmail", response[1].user.email);
      sessionManager.setDataInLocalStorage("token",response[1].token );

      window.location.reload()
     
    } else {
      apiFailureToast("Failed");
    }

  };

  const uploadFileToS3 = (e) => {
    e.preventDefault();
    if (images) {
      uploadPic();
      return;
    } 
      updateProfile()
    
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
          <div className="EditScreen">
            <form>
              <img className="img_src" src={img} />
              <input
                onChange={(event) => {
                  console.log(event.target?.files?.[0], "clicked");

                  setImages(event.target.files[0]);
                }}
                type="file"
                id="actual-btn"
                hidden
              />

              <label className="ImgScreen__button" for="actual-btn">
                Change Image
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
                type="name"
              ></input>
              <br />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                type="email"
              ></input>
              <br />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
                type="password"
              ></input>
              <br />
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm Password"
                type="password"
              ></input>
              <br />

              <button onClick={uploadFileToS3} type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="loginScreen__gradient" />

        <div className="formData"></div>
      </div>
    </div>
  );
}

export default EditProfileScreen;
