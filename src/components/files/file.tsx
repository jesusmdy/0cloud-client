import { FC } from "react";
import { File } from "@/types/file";
import GridItem from "../grid/item";
import useGetIcon from "@/hooks/useGetIcon";
import { bytesToSize } from "@/utils/file";
import { usePreview } from "@/state/preview";

const FileItem: FC<{ file: File }> = ({ file }) => {
  const { setIsOpen, setFile } = usePreview()
  const Icon = useGetIcon(file.mime_type)
  const onDoubleClick = () => {
    setFile(file)
    setIsOpen(true)
  }

  return (
    <GridItem
      title={file.original_filename}
      // onClick={() => router.push(`/drive/file/${file.id}`)}
      onDoubleClick={onDoubleClick}
      Icon={Icon}
      subheading={file.file_size ? bytesToSize(file.file_size) : undefined}
    />
  );
};

export default FileItem;
