import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { sessionManager } from "../managers/sessionManager";
import { useWeb3React } from "@web3-react/core";
import UserModules from "../services/user";
import CoinList from "./coinList";
import "./SignUpScreen.css";
function WalletScreen() {
  
  return (
    <div className="block-chain-icon">
      <div className="loginScreen__background">
       </div>
      
    </div>
  );
}

export default WalletScreen;
