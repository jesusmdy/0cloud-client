"use client"

import { usePreview } from "@/state/preview"
import { Box, Modal, ModalClose, ModalDialog, ModalOverflow } from "@mui/joy"
import FileContent from "./content"

export default function FilePreview() {
  const { isOpen, file, setIsOpen, setFile } = usePreview()

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
          <ModalClose />
          <Box flex={1} display="flex" alignItems="center" justifyContent="center">
            {file && (
              <FileContent file={file.id} />
            )}
          </Box>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  )
}