import axios from "axios";

const local = JSON.parse(localStorage.getItem("doccords_user"));
let token = " ";
if (local) {
  token = local.accessToken;
}

const customAxios = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

export default customAxios;
