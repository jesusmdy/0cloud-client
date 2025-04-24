'use client'

import useGetUser from "@/hooks/useGetUser";
import { FC, PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/state/user";

interface AuthLayoutProps {
  isPublic?: boolean
}

const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ children }) => {
  const { setUser } = useUser();
  const { data, isLoading, error } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error && error.status === 401) {
    router.push('/auth/login');
  }

  return children
}

export default AuthLayout