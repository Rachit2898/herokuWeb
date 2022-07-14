import FirstScreen from "./screens/HomeScreen";
import SecondScreen from "./screens/SingUpScreen";
import LoginScreen from "./screens/logInScreen";
import UserScreen from "./screens/UserScreen"
import ProfileScreen from "./screens/ProfileScreen";
import EditProfileScreen from "./screens/EditProfile"

import { sessionManager } from "../src/managers/sessionManager";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const user  = sessionManager.getDataFromLocalStorage("userInfo");

function App() {
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Routes>
            <Route exact path="/" element={<FirstScreen />} />
            <Route path="/SignUp" element={<SecondScreen />} />
            <Route path="/Login" element={<LoginScreen />} />
            <Route path="/Wallet" element={<FirstScreen />} />
            
          </Routes>
          
        ) : (
          <Routes>
            <Route path="/SignUp" element={<UserScreen />} />
            <Route path="/Login" element={<UserScreen />} />
            <Route path="/Wallet" element={<UserScreen />} />
            <Route exact path="/" element={<FirstScreen />} />
            <Route path="/profile" element={<ProfileScreen />}/>
            <Route path="/editProfile" element={<EditProfileScreen />} />

          </Routes>
        )}
       
       
      </Router>
    </div>
  );
}

export default App;
