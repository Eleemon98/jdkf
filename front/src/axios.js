import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "http://localhost:3050/",
    withCredentials: true,
});