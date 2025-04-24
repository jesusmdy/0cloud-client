'use client';

import { useParams } from "next/navigation";
import FileContent from "@/components/file/content";

const FilePage = () => {
  const params = useParams();

  return <FileContent file={params.fileId as string} />
}

export default FilePage