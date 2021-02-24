import axios from "axios";

export const environment = axios.create({
  baseURL: "http://frparvm97723807.corp.capgemini.com:8991/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
