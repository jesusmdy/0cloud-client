import FileItem from "./file";
import { FC } from "react";
import { File } from "@/types/file";
import { Folder } from "@/types/folder";
import { filter } from "lodash";
import { useParams } from "next/navigation";

const FileList: FC<{ files: Array<File>, folder: Folder }> = ({ files, folder }) => {
  const params = useParams();
  const isRoot = params.folderId === "0";

  if (isRoot) {
    return filter(files, (file) => file.parent_id === null).map((file) => (
      <FileItem key={file.id} file={file} />
    ));
  }

  return filter(files, (file) => file.parent_id === folder.id).map((file) => (
    <FileItem key={file.id} file={file} />
  ));
};

export default FileList;