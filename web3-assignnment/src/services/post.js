import { sessionManager } from "../managers/sessionManager";
const AccessToken = sessionManager.getDataFromLocalStorage("token");
console.log(AccessToken);

export default {
  createPost,
  getAllPost,
  myPost,
  likePost,
  comment,
  getAllAddress,
  createAddress,
};




async function createPost(credentials) {
  return fetch("http://localhost:3001/api/v2/createPost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
async function getAllPost() {
  return fetch("http://localhost:3001/api/v2/getAllPost", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
async function getAllAddress() {
  return fetch("http://localhost:3001/api/v3/getAllAddress", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}
async function myPost(credentials) {
  return fetch("http://localhost:3001/api/v2/myPost", {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
    },

    body: credentials,
  });
}



async function likePost(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v2/like", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify({postId:credentials}),
  }).then((data) => data.json());
}

async function comment(credentials) {
  console.log(credentials)
  return fetch("http://localhost:3001/api/v2/comment", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + AccessToken,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function createAddress(credentials) {
  console.log(credentials);
  return fetch("http://localhost:3001/api/v3/createAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + AccessToken,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}