import useSWR from "swr";
import { File } from "@/types/file";
import { api } from "@/api";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useGetFileByUUID(uuid: string) {
  const { data, error, isLoading } = useSWR<File | null>(
    `/files/${uuid}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error
  };
}