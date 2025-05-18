import useSWR from 'swr';
import { Folder } from '@/types/folder';
import { File } from '@/types/file';
import { api } from '@/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data)

export function useFolders() {
  const { data, error, isLoading, mutate } = useSWR<{
    folders: Array<Folder>
  }>(
    `/folders`,
    fetcher
  );

  return {
    data,
    refetch: mutate,
    isLoading,
    isError: error
  };
}
