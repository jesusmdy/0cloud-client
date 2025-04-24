import { Sheet } from "@mui/joy";
import { FolderOption } from "./options/folder";
import { FileOption } from "./options/file";
const CreationMenu = () => {
  return (
    <Sheet sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <FolderOption />
      <FileOption />
    </Sheet>
  )
}

export default CreationMenu