"use client"

import useUser from "@/state/user";
import { useRouter } from "next/navigation";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import Avatar from "@mui/joy/Avatar";
const UserMenu = () => {
  const user = useUser().user
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("token")
    router.push("/auth/login")
  }

  if (!user) return null
  return (
    <Dropdown>
      <MenuButton variant="plain" size="sm">
        <Avatar size="sm" />
      </MenuButton>
      <Menu>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </Dropdown>
  )
}

export default UserMenu