import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL;
const headers = {
  "Content-Type": "application/json",
};

type ApiProps = {
  url: string;
  data?: any;
};

export const postApi = ({ url, data }: ApiProps): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/${url}`,
      headers,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const getApi = ({ url }: ApiProps): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `${baseUrl}/${url}`,
      headers,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const putApi = ({ url, data }: ApiProps): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "PUT",
      url: `${baseUrl}/${url}`,
      headers,
      data,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const deleteApi = ({ url }: ApiProps): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: `${baseUrl}/${url}`,
      headers,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error: AxiosError) => {
        if (error.response?.data) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
