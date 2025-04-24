import Sidebar from "@/components/layout/sidebar";
import Toolbar from "@/components/layout/toolbar";
import AuthLayout from "@/layouts/auth";
import { Divider, Sheet } from "@mui/joy";
import { PropsWithChildren } from "react";
import QueueProcess from "@/components/queue/process";
import FilePreview from "@/components/file/preview";

const DriveLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthLayout>
      <QueueProcess />
      <FilePreview />
      <Sheet sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Sidebar />
        <Divider orientation="vertical" />
        <Sheet sx={{ flex: 1 }}>
          <Toolbar />
          <Divider />
          {children}
        </Sheet>
      </Sheet>
    </AuthLayout>
  );
};

export default DriveLayout;