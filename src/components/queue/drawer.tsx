import { QueueItem as QueueItemProps, Status, useQueue } from "@/state/queue";
import { bytesToSize } from "@/utils/file";
import { CheckIcon, ClockIcon, ExclamationCircleIcon, MinusCircleIcon, QueueListIcon } from "@heroicons/react/24/outline";
import { Box, Divider, Drawer, IconButton, LinearProgress, Typography } from "@mui/joy";

interface QueueDrawerProps {

  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

function StatusIcon({ status }: { status: QueueItemProps['status'] }) {
  switch (status) {
    case Status.PENDING:
      return <QueueListIcon width={20} height={20} />;
    case Status.IN_PROGRESS:
      return <ClockIcon width={20} height={20} />;
    case Status.COMPLETED:
      return <CheckIcon width={20} height={20} />;
    case Status.FAILED:
      return <ExclamationCircleIcon width={20} height={20} />;
  }
}

function CancelButton({ item }: { item: QueueItemProps }) {
  const { remove } = useQueue()

  if (item.status === Status.PENDING) return null
  return (
    <Box>
      <IconButton onClick={() => remove(item.id)}>
        <MinusCircleIcon width={20} height={20} />
      </IconButton>
    </Box>
  )
}

function QueueItem({ item }: { item: QueueItemProps }) {
  return (
    <Box display="flex" alignItems="center" gap={1} px={1}>
      <Box width={40} height={40} display="flex" alignItems="center" justifyContent="center" >
        <StatusIcon status={item.status} />
      </Box>
      <Box flex={1}>
        <Box
          display="flex"
          gap={1}
          py={2}
          pb={0}

          alignItems="center"
        >
          <Box display="flex" flexDirection="column" gap={1} flex={1}>
            <Typography level="body-xs">{item.name}</Typography>
            <Typography level="body-xs" textColor="text.tertiary">{bytesToSize(item.file.size)}</Typography>
          </Box>
          <CancelButton item={item} />
        </Box>
        <Box mt={1} display="flex" flexDirection="column" gap={2}>
          {
            item.status === Status.IN_PROGRESS && (
              <LinearProgress thickness={2} />
            )
          }
          <Divider />
        </Box>
      </Box>
    </Box>
  )
}

function QueueList() {
  const queue = useQueue().queue
  return (
    <Box flex={1} overflow="auto">
      {queue.map((item, index) => (
        <QueueItem key={index} item={item} />
      ))}
    </Box>
  )
}

export default function QueueDrawer({ toggleDrawer }: QueueDrawerProps) {
  const { isOpenDrawer } = useQueue()
  return (
    <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)} anchor="right" sx={{ display: "flex", flexDirection: "column" }}>
      <Box p={2}>
        <Typography level="h3">Queue</Typography>
      </Box>
      <Divider />
      <QueueList />
    </Drawer>
  )
}