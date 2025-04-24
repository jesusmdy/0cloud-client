"use client"

import { Box, Divider, Sheet, Typography } from "@mui/joy";
import UserMenu from "../user/menu";
import StorageChip from "../user/storage/chip";

const Sidebar = () => {
  return (
    <Sheet sx={{ width: 300, display: 'flex', flexDirection: 'column' }}>
      <Sheet sx={{ display: 'flex', height: '64px', px: 2, alignItems: "center" }}>
        <Typography level="title-md" fontWeight="bold">cloud0</Typography>
      </Sheet>
      <Divider />
      <Sheet sx={{ flex: 1 }}></Sheet>
      <Divider />
      <Sheet sx={{ display: 'flex', p: 2 }}>
        <UserMenu />
        <Box flex={1} />
        <StorageChip />
      </Sheet>
    </Sheet>
  )
}

export default Sidebar