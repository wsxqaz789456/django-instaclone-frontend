import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";
import {
  IChangePasswordVariables,
  ICreateCommnetVariables,
  IDeleteComment,
  ILoginVariables,
  ISignUpVariables,
} from "./types";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  withCredentials: true,
});

export const getMe = () =>
  instance.get(`users/me`).then((response) => response.data);

export const changeAvatar = async (data: any) =>
  instance
    .put(`/users/me`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const changeProfile = async (data: any) =>
  instance
    .put(`/users/me`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const changePassword = async ({
  old_password,
  new_password,
}: IChangePasswordVariables) =>
  instance
    .put(
      `/users/change-password`,
      { old_password, new_password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const login = ({ username, password }: ILoginVariables) =>
  instance
    .post(
      `/users/login`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const logout = () =>
  instance
    .post(`/users/logout`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
export const signUp = (data: ISignUpVariables) =>
  instance
    .post(`/users/`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getFeed = () =>
  instance.get(`users/feed`).then((response) => response.data);

export const deleteComment = ({ postId, pk }: IDeleteComment) =>
  instance
    .delete(`/comments/delete/${postId}/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const createComment = ({ content, pk }: ICreateCommnetVariables) =>
  instance
    .post(
      `/comments/create/${pk}`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const postUpload = (data: any) =>
  instance
    .post(`/posts/create/`, data, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const postEdit = ({ caption, pk }: any) => {
  return instance
    .put(
      `/posts/${pk}`,
      { caption },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const postDelete = (pk: number) => {
  return instance
    .delete(`/posts/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const postLike = (pk: number) => {
  return instance.get(`posts/like/${pk}`).then((response) => response.data);
};

export const postSave = (pk: number) => {
  return instance.get(`posts/save/${pk}`).then((response) => response.data);
};

export const getProfile = ({ queryKey }: QueryFunctionContext) => {
  const username = queryKey[1];
  return instance.get(`/users/@${username}`).then((response) => response.data);
};
export const getHashtag = ({ queryKey }: QueryFunctionContext) => {
  const hashtag = queryKey[1];
  return instance.get(`/hashtag/${hashtag}`).then((response) => response.data);
};

export const userUnfollow = (username: string) =>
  instance
    .get(`/users/@${username}/unfollow`)
    .then((response) => response.data);

export const userFollow = (username: string) =>
  instance.get(`/users/@${username}/follow`).then((response) => response.data);

export const getPost = ({ queryKey }: QueryFunctionContext) => {
  const pk = queryKey[1];
  return instance.get(`posts/${pk}`).then((response) => response.data);
};

export const searchData = ({ keyword }: any) => {
  return instance.get(`/posts/search/${keyword}`);
};
