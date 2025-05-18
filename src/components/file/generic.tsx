import { FC } from "react"
import { Alert, Button, Typography } from "@mui/joy"
import { File } from "@/types/file"
import { Info32Filled } from "@fluentui/react-icons"
import { DownloadFile } from "./download"

export const GenericPreview: FC<{ file: File, content: string }> = ({ file, content }) => {

  return (
    <Alert
      color="primary"
      startDecorator={<Info32Filled />}
      className="shadow-md"
      endDecorator={<DownloadFile file={file} content={content} />}
    >
      <Typography level="body-sm">Cannot preview <Typography level="body-sm" sx={{ fontWeight: "bold" }}>{file.original_filename}</Typography>, but you can still download it.</Typography>
    </Alert>
  )
}