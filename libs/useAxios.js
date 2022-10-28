import axios from "axios";

export const axiosGet = (url, options, success, error) => {
  axios
    .get(process.env.urlAPI + url, options)
    .then(res => success(res))
    .catch(err => error(err.response))
}

export const axiosPost = (url, options, data, success, error) => {
  axios
    .post(process.env.urlAPI + url, data, options)
    .then(res => success(res))
    .catch(err => error(err.response))
}