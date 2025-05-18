import { FC } from "react";
import { Folder } from "@/types/folder";
import GridItem from "../grid/item";
import { useRouter } from "next/navigation";
import { FolderIcon } from "@heroicons/react/24/solid";

const FolderItem: FC<{ folder: Folder }> = ({ folder }) => {
  const router = useRouter();
  return (
    <GridItem
      title={folder.name}
      onDoubleClick={() => router.push(`/drive/folder/${folder.id}`)}
      Icon={FolderIcon}
      options={[
        {
          label: "Folder info",
          action() {}
        },
        {
          label: "Delete",
          topDivider: true,
          action() {}
        },
      ]}
    />
  );
};

export default FolderItem;