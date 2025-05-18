import { useFolders } from "@/hooks/useFolders";
import { Folder } from "@/types/folder";
import { FolderIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon, FolderOpenIcon as FolderIconSolid } from "@heroicons/react/24/solid";
import { IconButton, List, ListItem, ListItemButton, listItemButtonClasses, ListItemContent, ListItemDecorator, Typography } from "@mui/joy";
import { filter, find, isEmpty, map } from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface FoldersNavigationProps {
  folderId: string;
}

function Folders({ folderId }: FoldersNavigationProps) {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const { data } = useFolders()
  const router = useRouter()

  const folder = useMemo(
    () => find(data?.folders, { id: folderId }),
    [data, folderId]
  )

  const label = useMemo(
    () => {
      if (folderId === "0") return "Drive"
      if (folder) return folder.name
      return "..."
    },
    [folderId, folder]
  )

  const folders = useMemo(
    () => filter(data?.folders, { parent_id: folderId === "0" ? "root" : folderId }),
    [folder, data]
  )

  console.log(folders, data?.folders)

  const selected = useMemo(
    () => String(params.folderId) === String(folderId),
    [params.folderId, folderId]
  )

  const hasSelectedFolder = useMemo(
    () => {
      const hasFolder = (folders: Array<Folder>) =>
        folderId === "0" ||
        find(folders, (folder) => folder.id === params.folderId) ||
        find(
          folders,
          (folder) => find(folders, (child) => child.parent_id === folder.id)
        );
      return hasFolder(folders);
    },
    [folders, params.folderId]
  );

  useEffect(
    () => {
      if (hasSelectedFolder) {
        setOpen(true);
      }
    },
    [hasSelectedFolder]
  );


  const startAction = useMemo(
    () => {
      if (isEmpty(folders)) return void null
      return (        
        <IconButton
          variant="plain"
          size="sm"
          color="neutral"
          onClick={() => setOpen((bool) => !bool)}
        >{open ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
        </IconButton>
      )
    },
    [folders]
  )


  const onFolderClick = () => {
    console.log(String(folderId) === String(params.folderId))
    if (String(folderId) === String(params.folderId)) {
      return
    }

    setOpen(true)
    router.push(`/drive/folder/${folderId}`)
  }

  return (
    <ListItem
      nested
      startAction={startAction}
    >
      <ListItemButton
        selected={selected}
        onClick={onFolderClick}
      >
        <ListItemDecorator>
          {selected ? <FolderIconSolid className="size-4" /> : <FolderIcon className="size-4" />}
        </ListItemDecorator>
        <ListItemContent>
          <Typography
            level="body-sm"
          >{label}</Typography>
        </ListItemContent>
      </ListItemButton>
      {open && map(folders, f => (
        <Folders key={f.id} folderId={f.id} />
      ))}
    </ListItem>
  )
}

export default function FoldersNavigation() {
  const { isLoading } = useFolders();

  if (isLoading) return <div>Loading...</div>

  return (
    <List
      size="sm"
    >
      <Folders folderId="0" />
    </List>
  )
}