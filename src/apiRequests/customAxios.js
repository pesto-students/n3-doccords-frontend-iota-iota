import axios from "axios";

const token = JSON.parse(localStorage.getItem("doccords_user")).accessToken;

const customAxios = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 3000,
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
});

export default customAxios;
