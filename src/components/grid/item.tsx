import { FluentIcon } from "@fluentui/react-icons";
import { FC, Fragment } from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import { Avatar, IconButton } from "@mui/joy";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const GridItem: FC<{
  title: string
  subheading?: string
  Icon: FluentIcon
  onClick?: () => void
  onDoubleClick?: () => void
}> = ({ title, subheading, Icon, onClick, onDoubleClick }) => {
  return (
    <Card
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      sx={{ cursor: 'pointer', p: 0, gap: 0 }}
      size="sm"
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1, p: 1 }}>
        <Avatar
          size="sm"
          variant="plain"
          sx={{ borderRadius: 0 }}
        >
          <Icon />
        </Avatar>
        <Typography level="body-sm" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%', }} component="span">{title}</Typography>
        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
          <EllipsisHorizontalIcon />
        </IconButton>
      </CardContent>

      {subheading && (
        <>
          <Divider />
          <CardContent orientation="horizontal" sx={{ p: 1 }}>
            <Typography level="body-xs">{subheading}</Typography>
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default GridItem
