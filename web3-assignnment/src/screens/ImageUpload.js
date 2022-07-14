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

function EditProfileScreen() {
  const history = useNavigate();
  const [uploadFile, setUploadFile] = React.useState("");
  const [images, setImages] = useState("");
  const [url, setUrl] = useState(undefined);
  const setScreen = () => {};

  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };

  const image = "";

  const [img, _setImg] = useState("");

  const setImg = () => {
    if (!image) {
      _setImg(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
      );
    } else {
      _setImg(
        "https://cdn.britannica.com/25/222725-050-170F622A/Indian-cricketer-Mahendra-Singh-Dhoni-2011.jpg"
      );
    }
  };

  useEffect(() => {
    setImg(img);
  }, []);

  const uploadPic = () => {
    console.log(images);
    const data = new FormData();
    data.append("file", images);

    fetch("http://localhost:3001/api/v1/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("urls", data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data, "datatas");
  };

  const uploadFileToS3 = (e) => {
    e.preventDefault();
    if (images) {
      uploadPic();
    } else {
      console.log("clicked but not having an image");
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
          <div className="EditScreen">
            <form>
              <img className="img_src" src={img} />
              <input
                onChange={(event) => {
                  // console.log(event.target?.files?.[0], "clicked");

                  setImages(event.target.files[0]);
                }}
                type="file"
                id="actual-btn"
                hidden
              />

              <label className="ImgScreen__button" for="actual-btn">
                Change Image
              </label>
              <input placeholder="Name" type="name"></input>
              <br />
              <input placeholder="Email" type="email"></input>
              <br />
              <input placeholder="Password" type="password"></input>
              <br />
              <input placeholder="Confirm Password" type="password"></input>
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
