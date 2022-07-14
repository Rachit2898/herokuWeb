import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { sessionManager } from "../managers/sessionManager";
import { useWeb3React } from "@web3-react/core";
import UserModules from "../services/user";
import PostModules from "../services/post";
import CoinList from "./coinList";
import "./SignUpScreen.css";
function WalletScreen(props) {
  console.log(props, "propsee");
  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };
  const history = useNavigate();
  const [defaultAddress, setDefaultAddress] = useState("");
  const { activate, deactivate } = useWeb3React();
  const [userBalance, setUserBalance] = useState("0");
  const [errorMessage, setErrorMessage] = useState();
  const [addressValue, setAddressValue] = useState("0");
  const [post, setPost] = useState(false);
  const user = sessionManager.getDataFromLocalStorage("userId");
  const setScreen = () => {};
  const connectWalletHandler = async () => {
    const response = async () => {
      const responsee = window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
          setAddressValue(result[0]);
          return result[0];
        });
      return responsee;
    };
    if (window.ethereum) {
      response();
    } else {
      setErrorMessage("Install MetaMask");
    }
    // return response;
  };
  const accountChangeHandler = async (newAccount) => {
    setDefaultAddress(newAccount);
    getUserBalance(newAccount);
  };
  useEffect(() => {
    
    const setAddress = async (x) => {
      
      const data = {
        metaMaskAddress: defaultAddress,
        id: user,
      };
      console.log(data);
      const response = await parseResponse(PostModules.createAddress(data));
      console.log(response[1]);
    };
    setAddress();
   
  },[defaultAddress]);

  const getUserBalance = async (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        console.log(ethers.utils.formatEther(balance));
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };
  const dataCookies = sessionManager.getDataFromLocalStorage("userInfo");
  console.log(dataCookies);
  const chaninChangeHandler = () => {
    
  };

  const logoutUser = (event) => {
    console.log(window.ethereum.isMetaMask);
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum.on("accountsChanged", function (account) {
        return () => window.ethereum.removeListener("accountsChanged", account);
      });
    }
    console.log(event);
  };

  window.ethereum.on("accountChanged", accountChangeHandler);
  window.ethereum.on("chainChanged", chaninChangeHandler);

  const email = "merachit2898@gmail.com";

  async function disconnect() {
    console.log("disconnect");
    await window.ethereum.on("disconnect", (error) => console.log(error));
    window.location.reload();
  }

  const image = "r";

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

  const setPosts = () => {
    if (post == true) {
      console.log("falsse");
      setPost(false);
    } else {
      setPost(true);
      console.log("true");
    }
  };

  const users = "";

  return (
    <div className="block-chain-icon">
      <div className="loginScreen__background">
        <div className="LogIn__body">
          <h1>Connection to MetaMask</h1>
          <button className="connect_button" onClick={connectWalletHandler}>
            Connect Wallet
          </button>
          <div className="accountDisplay">
            <h3>Address: {defaultAddress}</h3>
          </div>
          <div className="balanceDisplay">
            <h3>Balance: {userBalance}</h3>
          </div>
          {errorMessage}
        </div>
        <div className="loginScreen__gradient" />
      </div>
    </div>
  );
}

export default WalletScreen;

