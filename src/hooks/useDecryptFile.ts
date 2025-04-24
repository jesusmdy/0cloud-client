import useSWR from 'swr';
import { File } from '@/types/file';
import { api } from '@/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useDecryptFile(fileUUID: string) {
  const { data, error, isLoading } = useSWR<{
    content: string,
    file: File
  }>(
    `/files/decrypt/${fileUUID}`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error
  };
}