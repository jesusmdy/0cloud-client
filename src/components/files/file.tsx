import { FC, useMemo } from "react";
import { File, ThumbSizes } from "@/types/file";
import GridItem from "../grid/item";
import useGetIcon from "@/hooks/useGetIcon";
import { bytesToSize } from "@/utils/file";
import { usePreview } from "@/state/preview";
import { first, last } from "lodash";
import useSWR from "swr";
import { api } from "@/api";
import { Typography } from "@mui/joy";

const FileItem: FC<{ file: File }> = ({ file }) => {
  const { setIsOpen, setFile } = usePreview()
  const Icon = useGetIcon(file.mime_type)

  const { data } = useSWR<{
    data: string
  }>(`/thumbnails/${file.id}/${ThumbSizes.medium}/preview`, api.get)


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
      subheading={
        data ? (
          <img src={data.data} alt={file.original_filename} className="w-full h-full object-cover rounded-md" />
        ) : (
          <div className="w-full h-full bg-blue-50 rounded-md">
            <div className="flex items-center justify-center w-full h-full bg-blue-300 rounded-md">
              <div className="px-4 py-2 rounded flex items-center justify-center bg-black/10">
                <Typography
                  level="body-sm"
                  className="text-blue-900 select-none"
                  fontWeight="bold"
                >
                  {(last(file.original_filename.split('.')) || '').toUpperCase()}
                </Typography>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default FileItem;
