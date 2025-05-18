import { FluentIcon } from "@fluentui/react-icons";
import React, { FC, Fragment } from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

type OptionItem = {
  label: string
  action: () => void
  icon?: typeof EllipsisHorizontalIcon
  topDivider?: boolean
  bottomDivider?: boolean
}

function OptionsMenu({options}: {options: Array<OptionItem>}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { size: 'sm', color: 'neutral' } }}
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Menu
        size="sm"
        placement="bottom-start"
        sx={{ width: '150px' }}
      >
        {options.map((option) => (
          <Fragment>
            {
              option.topDivider && (
                <Divider />
              )
            }
            <MenuItem onClick={option.action}>{option.label}</MenuItem>
            {
              option.bottomDivider && (
                <Divider />
              )
            }
          </Fragment>
        ))}
      </Menu>
    </Dropdown>
  )
}

const GridItem: FC<{
  title: string
  subheading?: string | React.ReactNode
  Icon: FluentIcon
  options?: Array<OptionItem>
  onClick?: () => void
  onDoubleClick?: () => void
}> = ({ title, subheading, Icon, onClick, onDoubleClick, options }) => {
  return (
    <Card
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      sx={{ cursor: 'pointer', p: 0, gap: 0, maxHeight: "165px" }}
      size="sm"
    >
      <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1, p: 1 }}>
        <Icon className="size-4" />
        <Typography level="body-xs" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%', userSelect: "none", flex: 1 }} component="span">{title}</Typography>
        {
          options && (
            <OptionsMenu options={options} />
          )
        }
      </CardContent>

      {subheading && (
        <>
          <Divider />
          <CardContent orientation="horizontal" sx={{ p: 1, minHeight: "128px" }}>
          {subheading}
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default GridItem
