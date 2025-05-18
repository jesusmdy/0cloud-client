'use client'

import useGetUser from "@/hooks/useGetUser";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import useUser, { Status } from "@/state/user";
import { Box, CircularProgress, Typography } from "@mui/joy";
import { CircleStackIcon } from "@heroicons/react/24/solid";

interface AuthLayoutProps {
  isPublic?: boolean
}

function Loader() {
  const {status} = useUser();

  const label = useMemo(
    () => {
      switch (status) {
        case Status.LOADING:
          return 'Loading...';
        case Status.NOT_AUTHENTICATED:
          return 'Continue with sign-in';
        case Status.AUTHENTICATED:
          return 'Welcome';
        case Status.ERROR:
          return 'Error';
      }
    },
    [status]
  )

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2
      }}
    >
      <CircularProgress color="primary" thickness={2} sx={{ '--CircularProgress-size': '100px' }}>
        <CircleStackIcon className="size-7" />
      </CircularProgress>
      <Typography level="body-xs">
        {label}
      </Typography>
    </Box>
  )
}

const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ children }) => {
  const { setUser, status, setStatus } = useUser();
  const { data, isLoading, error } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setUser(data.data);
      setStatus(Status.AUTHENTICATED);
    }
    if (isLoading) {
      setStatus(Status.LOADING)
    }

    if (error) {
      setStatus(Status.ERROR)
      if (error.status === 401) {
        router.push('/auth/login');
      }
    }
  }, [data, isLoading, setUser, error, status, setStatus]);

  if (status !== Status.AUTHENTICATED) {
    return <Loader />;
  }

  return children
}
export default AuthLayout