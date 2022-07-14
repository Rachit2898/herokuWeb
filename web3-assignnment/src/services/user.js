import { sessionManager } from "../managers/sessionManager";
const AccessToken = sessionManager.getDataFromLocalStorage("token");


export default {
  signUp,
  signin,
  updatePic,
  updateAddress,
  updateProfile
};

async function signin(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
async function updateProfile(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v1/updateProfile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function updateAddress(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v3/createAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
async function updatePic(data) {
  console.log(data);
  return fetch("http://localhost:3001/api/v1/upload", {
    method: "post",
    body: data,
    headers: {
      Authorization: "Bearer " + AccessToken,
    },
    
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("urls", data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}




async function signUp(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
