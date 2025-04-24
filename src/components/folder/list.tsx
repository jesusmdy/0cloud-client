import { Folder } from "@/types/folder";
import { FC } from "react";
import FolderItem from "./folder";
import { filter } from "lodash";
import { useParams } from "next/navigation";

const FolderList: FC<{ folders: Array<Folder> }> = ({ folders }) => {
  const params = useParams();
  const isRoot = params.folderId === "0";
  if (isRoot) {
    return filter(folders, (folder) => folder.parent_id === null).map((folder) => (
      <FolderItem key={folder.id} folder={folder} />
    ));
  }

  return filter(folders, (folder) => folder.parent_id === params.folderId).map((folder) => (
    <FolderItem key={folder.id} folder={folder} />
  ));
};

export default FolderList;