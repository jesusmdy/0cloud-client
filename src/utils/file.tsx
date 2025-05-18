import { DownloadFile } from "@/components/file/download";
import { GenericPreview } from "@/components/file/generic";
import { File } from "@/types/file";

export const bytesToSize = (bytes: number) => {
  if (bytes === 0) return "0B";
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2).replace(/\.0+$/, "") + " " + sizes[i];
};

export const getFileContents = (file: File, content: string) => {
  if (file.mime_type.startsWith("image")) {
    return <img src={`data:${file.mime_type};base64,${content}`} alt={file.original_filename} className="max-h-full max-w-full shadow-lg" />;
  }
  if (file.mime_type.startsWith("video")) {
    return <video src={`data:${file.mime_type};base64,${content}`} controls className="max-h-full max-w-full shadow-lg" />;
  }
  if (file.mime_type.startsWith("audio")) {
    return <audio src={`data:${file.mime_type};base64,${content}`} controls />;
  }
  if (file.mime_type.startsWith("application/pdf")) {
    return <iframe src={`data:${file.mime_type};base64,${content}`} title={file.original_filename} width="100%" height="90%" />;
  }

  return <GenericPreview file={file} content={content} />
}
