import { api } from "@/api";
import useSWR from "swr";
import { User } from "@/types/user";

const useGetUser = () => {
  const { data, isLoading, error } = useSWR<{
    data: User
  }>(
    `/user`,
    api.get
  );

  return {
    data,
    isLoading,
    error
  };
}

export default useGetUser
