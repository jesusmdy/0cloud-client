"use client"

import { api } from "@/api"
import { QueueItem, Status, useQueue } from "@/state/queue"
import { Fragment, useCallback, useEffect, useMemo } from "react"


export default function QueueProcess() {
  const { queue, update } = useQueue()

  const inProgress = useMemo(
    () => queue.find(item => item.status === Status.IN_PROGRESS),
    [queue]
  )

  const handleEncrypt = useCallback(
    (item: QueueItem) => {
      const formBody = new FormData()
      formBody.append('file', item.file, item.name)
      formBody.append('parent_id', item.parent_id ?? '')

      update(item.id, { ...item, status: Status.IN_PROGRESS })

      api.post('/files/encrypt', formBody)
        .then(() => {
          update(item.id, { ...item, status: Status.COMPLETED })
        })
        .catch(() => {
          update(item.id, { ...item, status: Status.FAILED })
        })
    }, [update]
  )


  useEffect(
    () => {
      const pending = queue.find(item => item.status === Status.PENDING)

      if (pending && !inProgress) {
        handleEncrypt(pending)
      }

    },
    [queue, inProgress, handleEncrypt]
  )

  return <Fragment />
}