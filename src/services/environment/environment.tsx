import axios from "axios";

const IPv4_Address = "192.168.1.169"; //Here goes your IPv4 Address ( "ipconfig" in command prompt and you get the address)

export const environment = axios.create({
  baseURL: "http://" + IPv4_Address + ":3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
