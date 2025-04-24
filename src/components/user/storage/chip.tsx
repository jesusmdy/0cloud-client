import useUser from "@/state/user";
import { bytesToSize } from "@/utils/file";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import { Box, LinearProgress, Typography } from "@mui/joy";
import { useMemo } from "react";

export default function StorageChip() {
  const { user } = useUser()

  const percentageAllocated = useMemo(
    () => {
      const allocated = user?.storage?.allocated || 0
      const limit = user?.storage?.available || 0
      const used = allocated - limit

      // return from 0 to 100
      return (user?.storage?.allocated || 0) / (user?.storage?.available || 1) * 100
    },
    [user]
  )

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, border: '1px solid #E0E0E0', pr: 2, pl: 1, borderRadius: 20 }}>
      <CircleStackIcon width={18} height={18} />
      <Box>
        <Typography level="body-xs">
          {bytesToSize(user?.storage?.allocated || 0)} of {bytesToSize(user?.storage?.available || 0)}
        </Typography>
        <LinearProgress determinate thickness={4} value={percentageAllocated} />
      </Box>
    </Box>
  )
}