import { File } from "@/types/file";
import { PhotoIcon, VideoCameraIcon, DocumentIcon } from "@heroicons/react/24/solid";


const useGetIcon = (mimeType: File['mime_type']) => {
  if (mimeType.startsWith('image')) {
    return PhotoIcon;
  }
  if (mimeType.startsWith('video')) {
    return VideoCameraIcon;
  }
  return DocumentIcon;
}

export default useGetIcon