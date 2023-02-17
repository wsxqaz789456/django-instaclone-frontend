import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IGetMe } from "../types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IGetMe>(["me"], getMe, {
    retry: false,
  });
  return {
    isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
