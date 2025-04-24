import { FC } from "react"
import { useDecryptFile } from "@/hooks/useDecryptFile";
import { getFileContents } from "@/utils/file";

const FileContent: FC<{
  file: string
}> = ({ file }) => {

  const { data, isLoading, isError } = useDecryptFile(file);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading file</div>;
  if (!data) return <div>No data available</div>;

  return getFileContents(data.file, data.content);
}

export default FileContent