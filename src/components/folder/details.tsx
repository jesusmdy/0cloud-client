"use client"
import { FC, Fragment } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftRegular } from "@fluentui/react-icons";
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { useFileList } from "@/hooks/useFileList";

const FolderDetails: FC = () => {
  const params = useParams();
  const isRoot = params.folderId === "0";
  const router = useRouter();
  const { data } = useFileList(params.folderId as string);

  const goBack = () => {
    if (data?.parent) {
      router.push(`/drive/folder/${data.parent.id}`);
    } else {
      router.push(`/drive/folder/0`);
    }
  };

  return (
    <Sheet sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
      {
        !isRoot && (
          <Button onClick={goBack} startDecorator={<ChevronLeftRegular />} variant="plain">
            Back
          </Button>
        )
      }
      <Typography level="title-sm">{isRoot ? "Drive" : data?.folder?.name}</Typography>
    </Sheet>
  )
};

export default FolderDetails;