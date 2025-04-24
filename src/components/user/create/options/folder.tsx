"use client"

import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import { Fragment, useCallback, useState } from "react";
import { IconButton, Input, Button, Sheet, Divider } from "@mui/joy";
import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "next/navigation";
import { api } from "@/api";
import useSWR from "swr";

interface FormValues {
  name: string
}

const schema = object().shape({
  name: string().required()
})

export const FolderOption = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams()
  // revalidate
  const { mutate } = useSWR(`/folders/${params.folderId}/contents`, api.get)


  const handleOpen = () => {
    setOpen(true);
  }

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const { folderId } = params
      setIsLoading(true)
      try {
        await api.post('/folders', {
          name: values.name,
          parent_id: folderId !== '0' ? folderId : null
        })
        mutate()
        setOpen(false)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }, [params, setIsLoading]
  )

  return (
    <Fragment>
      <IconButton onClick={handleOpen} variant="plain" size="lg" aria-label="Create folder" >
        <FolderPlusIcon width={20} height={20} />
      </IconButton>
      <Modal
        disableAutoFocus
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalDialog sx={{ width: 400 }}>
          <ModalClose sx={{ m: 1 }} />
          <Typography level="body-sm" fontWeight="bold">Create folder</Typography>
          <Divider />
          <Sheet sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Input
              placeholder="Folder name"
              variant="soft"
              sx={{ flex: 1 }}
              {...form.register('name')}
            />
            <Button
              variant="soft"
              color="primary"
              type="submit"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isLoading || form.formState.isSubmitting || !form.formState.isValid}
              loading={isLoading || form.formState.isSubmitting}
            >
              Create
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}