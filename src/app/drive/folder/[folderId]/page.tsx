'use client';

import { useFileList } from "@/hooks/useFileList";
import { useParams } from "next/navigation";
import FileList from "@/components/files/list";
import FolderList from "@/components/folder/list";
import { Sheet, Typography } from "@mui/joy";
import { PropsWithChildren } from "react";
import { get } from "lodash";
import { Folder } from "@/types/folder";
export const dynamic = 'force-dynamic';

interface SectionProps extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <Sheet>
      <Typography level="title-sm" sx={{ mb: 1 }}>{title}</Typography>
      <Sheet className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {children}
      </Sheet>
    </Sheet>
  )
}

export default function FilesPage() {
  const params = useParams();
  const { data, } = useFileList(params.folderId as string);

  return (
    <Sheet sx={{ display: 'flex', flexDirection: 'column', p: 2, gap: 2 }}>
      <Section title="Folders">
        <FolderList folders={get(data, "folders", [])} />
      </Section>
      <Section title="Files">
        <FileList files={get(data, "files", [])} folder={get(data, "folder", null) as Folder} />
      </Section>
    </Sheet>
  );
}