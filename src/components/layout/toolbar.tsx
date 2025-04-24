
import Sheet from "@mui/joy/Sheet/Sheet"
import FolderDetails from "@/components/folder/details";
import CreationMenu from "../user/create/menu";
import QueueButton from "../queue/button";

const Toolbar = () => {
  return (
    <Sheet sx={{ display: 'flex', height: "64px", px: 2 }}>
      <FolderDetails />
      <Sheet sx={{ flex: 1 }} />
      <CreationMenu />
      <QueueButton />
    </Sheet>
  )
}

export default Toolbar