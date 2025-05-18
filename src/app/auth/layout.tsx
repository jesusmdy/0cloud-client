"use client"

import { Box, Card } from "@mui/joy";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex w-screen h-screen">
      <Box
        sx={{
          // bgcolor: theme => theme.palette.primary[50],
          flex: 1,
          p: 4,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card className="w-full md:w-1/2 lg:w-1/4 h-auto" variant="soft" sx={{ bgcolor: 'transparent' }}>
          {children}
        </Card>
      </Box>
    </Box>
  );
};

export default AuthPageLayout;