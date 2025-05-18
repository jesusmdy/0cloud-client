import useSWR from 'swr';
import { File } from '@/types/file';
import { api } from '@/api';

const fetcher = (url: string) => api.post(url).then((res) => res.data);

export function useDecryptFile(fileUUID: string, folderId: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    content: string,
    file: File
  }>(
    `/folders/${folderId}/files/${fileUUID}/decrypt`,
    fetcher,
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate
  };
}