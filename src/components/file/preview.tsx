"use client"

import { usePreview } from "@/state/preview"
import { Box, DialogContent, DialogTitle, Divider, Modal, ModalClose, ModalDialog, ModalOverflow, Typography } from "@mui/joy"
import FileContent from "./content"
import { DownloadFile } from "./download"
import { useDecryptFile } from "@/hooks/useDecryptFile"
import { useEffect } from "react"

export default function FilePreview() {
  const { isOpen, file, setIsOpen, setFile } = usePreview()

  const { data, mutate } = useDecryptFile(file?.id ?? "", file?.parent_id ?? "root")


  useEffect(() => {
    if (file) {
      mutate()
    }
  }, [file])

  const handleClose = () => {
    setFile(null)
    setIsOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={handleClose} sx={{ p: 0 }}>
      <ModalOverflow>
        <ModalDialog
          layout="fullscreen"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography level="body-sm">
              {file?.original_filename}
            </Typography>
            <div className="flex-1"></div>
            <DownloadFile file={file as never} content={data?.content ?? ""} />
            <ModalClose sx={{ position: "inherit" }} />
          </Box>
          <Divider />
          <DialogContent>
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
              {file && (
                <FileContent file={file.id} folderId={file.parent_id ?? "root"} />
              )}
            </Box>
          </DialogContent>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}