
type VideoMimeType = 'video/mp4' | 'video/mpeg' | 'video/quicktime' | 'video/x-msvideo' | 'video/x-ms-wmv' | 'video/unknown';

type AudioMimeType = 'audio/mpeg' | 'audio/ogg' | 'audio/wav' | 'audio/unknown';

type TextMimeType = 'text/plain' | 'text/html' | 'text/css' | 'text/javascript' | 'text/unknown';

type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif' | 'image/bmp' | 'image/avif' | 'image/ico' | 'image/tiff' | 'image/svg+xml' | 'image/x-icon' | 'image/unknown';

type DocumentMimeType = 'application/pdf' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/unknown';

type ArchiveMimeType = 'application/zip' | 'application/x-zip-compressed' | 'application/gzip' | 'application/x-gzip' | 'application/x-tar' | 'application/x-gtar' | 'application/x-bzip2' | 'application/x-bzip' | 'application/x-gtar-compressed' | 'application/x-gzip-compressed' | 'application/x-tar-compressed' | 'application/x-gtar-compressed' | 'application/x-gzip-compressed' | 'application/unknown';

type ExecutableMimeType = 'application/x-msdownload' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/x-msi' | 'application/unknown';

type MimeType = VideoMimeType | AudioMimeType | TextMimeType | ImageMimeType | DocumentMimeType | ArchiveMimeType | ExecutableMimeType;

export type FileThumbnail = {
  file_id: string;
  encrypted_filename: string;
  mime_type: MimeType;
  file_size: number;
  file_content: string;
}

export enum ThumbSizes {
  small = '128x128',
  medium = '256x256',
  large = '512x512'
}

export type File = {
  id: string;
  file_size: number;
  created_at: string;
  encrypted_filename: string;
  original_filename: string;
  parent_id: string | null;
  mime_type: MimeType;
  thumbnails?: Record<ThumbSizes, FileThumbnail>;
};