import { FC } from "react"
import { Button } from "@mui/joy"
import { File } from "@/types/file"

export const DownloadFile: FC<{ file: File, content: string }> = ({ file, content }) => {

  const downloadFile = (file: File, content: string) => {
    const link = document.createElement("a")
    link.href = `data:${file.mime_type};base64,${content}`
    link.download = file.original_filename
    link.click()
  }

  return (

    <Button
      variant="outlined"
      sx={{ borderWidth: 2, borderRadius: 8 }}
      color="primary"
      onClick={() => downloadFile(file, content)}
    >
      Download
    </Button>
  )
}