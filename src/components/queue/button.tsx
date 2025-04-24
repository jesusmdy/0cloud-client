"use client"

import { Avatar, Box, CircularProgress } from "@mui/joy";
import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { Status, useQueue } from "@/state/queue";
import QueueDrawer from "./drawer";
import { useMemo } from "react";
import { isEmpty } from "lodash";

export default function QueueButton() {
  const { queue, setIsOpenDrawer } = useQueue()

  const totalProgress = useMemo(
    (): number => {
      const completed = queue.filter(item => item.status === Status.COMPLETED)
      const inProgress = queue.filter(item => item.status === Status.IN_PROGRESS)

      if (queue.length === 0) return 0
      return (completed.length + inProgress.length) / queue.length * 100
    },
    [queue]
  )

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpenDrawer(inOpen);
    };

  if (isEmpty(queue)) return null

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar onClick={toggleDrawer(true)} sx={{ cursor: "pointer" }}>
        <CircularProgress thickness={2} determinate value={totalProgress}>
          <ArrowsUpDownIcon width={20} height={20} />
        </CircularProgress>
      </Avatar>
      <QueueDrawer toggleDrawer={toggleDrawer} />
    </Box>
  )
}