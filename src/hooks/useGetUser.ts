import { api } from "@/api";
import useSWR from "swr";
import { User } from "@/types/user";

const useGetUser = () => {
  const { data, isLoading, error, mutate } = useSWR<{
    data: User
  }>(
    `/user`,
    api.get
  );

  return {
    data,
    refetch: mutate,
    isLoading,
    error
  };
}

export default useGetUser
