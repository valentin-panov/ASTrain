import axios from "axios";

const publicFetch = axios.create({
  baseURL: `${process.env.API_URL}api/`,
});

export { publicFetch };
