"use client"

import { api } from "@/api"
import { useFileList } from "@/hooks/useFileList"
import useGetUser from "@/hooks/useGetUser"
import { QueueItem, Status, useQueue } from "@/state/queue"
import { useParams } from "next/navigation"
import { Fragment, useCallback, useEffect, useMemo } from "react"


export default function QueueProcess() {
  const { queue, update } = useQueue()
  const params = useParams()
  const { refetch: refetchFiles } = useFileList(params.folderId as string)
  const { refetch: refetchUser } = useGetUser()

  const inProgress = useMemo(
    () => queue.find(item => item.status === Status.IN_PROGRESS),
    [queue]
  )

  const handleEncrypt = useCallback(
    (item: QueueItem) => {
      const formBody = new FormData()
      formBody.append('file', item.file, item.name)

      const folderId = item.parent_id === "0" ? "root" : item.parent_id

      update(item.id, { ...item, status: Status.IN_PROGRESS })

      api.put(`/folders/${folderId}/files/add`, formBody)
        .then(() => {
          update(item.id, { ...item, status: Status.COMPLETED })
          refetchFiles()
          refetchUser()
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