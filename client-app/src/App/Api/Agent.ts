import axios, { AxiosResponse } from "axios";
import { IActivity, IActivitesEnvelope } from "../Models/Activity";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValue } from "../Models/User";
import { IProfile, IPhoto } from "../Models/Profile";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }
  const { status, data, config, headers } = error.response;
  let tokenInfo = headers["www-authenticate"];
  if (status === 401 && tokenInfo.includes("invalid_token")) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.error("Your session has expired, please login again");
  }
  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server Error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) =>
//     setTimeout(() => resolve(response), ms)
//   );

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postform: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Activities = {
  list: (params: URLSearchParams): Promise<IActivitesEnvelope> =>
    axios
      .get("/activities", { params: params })
      .then(responseBody),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.del(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValue): Promise<IUser> =>
    requests.post("/user/login", user),
  register: (user: IUserFormValue): Promise<IUser> =>
    requests.post("/user/register", user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profile/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postform(`/photos`, photo),
  setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.del(`photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) =>
    requests.put(`/profile`, profile),
  follow: (username: string) =>
    requests.post(`/profile/${username}/follow`, {}),
  unfollow: (username: string) => requests.del(`/profile/${username}/follow`),
  listFollowings: (username: string, predicate: string) =>
    requests.get(`/profile/${username}/follow?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get(`/profile/${username}/activities?predicate=${predicate}`),
};

export default {
  Activities,
  User,
  Profiles,
};
