import useSWR from 'swr';
import { Folder } from '@/types/folder';
import { File } from '@/types/file';
import { api } from '@/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data)

export function useFileList(folderId: string) {
  const { data, error, isLoading } = useSWR<{
    folder: Folder;
    parent: Folder | null;
    folders: Array<Folder>;
    files: Array<File>;
  }>(
    `/folders/${folderId}/contents`,
    fetcher
  );

  return {
    data,
    isLoading,
    isError: error
  };
}