"use client"

import { IconButton } from "@mui/joy";
import { DocumentPlusIcon, } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { Status, useQueue } from "@/state/queue";


export const FileOption = () => {
  const params = useParams()
  const { add, setIsOpenDrawer } = useQueue()

  const handleOpen = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files
      if (files) {
        Array.from(files).map(file => {
          const id = crypto.randomUUID()
          add({
            id,
            name: file.name,
            file,
            type: 'file',
            parent_id: params.folderId as string ?? null,
            progress: 0,
            status: Status.PENDING,
          })
        })
        setIsOpenDrawer(true)
      }
    }
    input.click()
  }


  return (
    <IconButton onClick={handleOpen} variant="plain" size="lg" aria-label="Create folder" >
      <DocumentPlusIcon width={20} height={20} />
    </IconButton>
  )
}