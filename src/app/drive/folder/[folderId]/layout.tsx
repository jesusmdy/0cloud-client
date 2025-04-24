'use client'

import { useParams } from "next/navigation";
import { useFileList } from "@/hooks/useFileList";
import { LinearProgress, Sheet } from "@mui/joy";
import { PropsWithChildren } from "react";

export default function FolderLayout({ children }: PropsWithChildren) {
  const params = useParams();
  const { isLoading } = useFileList(params.folderId as string);

  return (
    <Sheet sx={{ height: '100vh', overflow: "auto", }}>
      {
        isLoading && (
          <LinearProgress size="sm" variant="plain" />
        )
      }
      {children}
    </Sheet>
  )
}