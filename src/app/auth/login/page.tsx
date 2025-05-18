"use client"

import Input from "@mui/joy/Input"
import Button from "@mui/joy/Button"
import Label from "@mui/joy/FormLabel"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { api } from "@/api";
import { useRouter } from "next/navigation";
import { Box, Snackbar, Typography } from "@mui/joy";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import JoyLink from "@mui/joy/Link"

interface LoginForm {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const router = useRouter()


  const [error, setError] = useState<boolean>(false)

  const onSubmit = (data: LoginForm) => {
    setIsLoading(true)
    api.post<{
      token: string
    }>('/login', data)
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('token', token)
        router.push('/drive/folder/0')
      })
      .catch(() => {
        setIsLoading(false)
        setError(true)
      })
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Snackbar
        autoHideDuration={2000}
        color="danger"
        size="sm"
        variant="soft"
        open={error}
        onClose={() => setError(false)}
      >
        Error with email or password
      </Snackbar>
      <div className="w-full p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Box className="size-16 bg-sky-900 text-white p-4 rounded-md shadow-sm">
            <LockClosedIcon />
          </Box>
          <Typography level="h4">Sign In</Typography>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" required>Email</Label>
              <Input type="email" {...register("email")} id="email" disabled={isLoading} />
              {errors.email && <Typography level="body-xs" className="text-red-500">{errors.email.message}</Typography>}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" required>Password</Label>
              <Input type="password" {...register("password")} id="password" disabled={isLoading} />
              {errors.password && <Typography level="body-xs" className="text-red-500">{errors.password.message}</Typography>}
            </div>
          </div>
          <Box display="flex" justifyContent="space-between">
            <JoyLink href="/auth/register" fontSize="sm" component={Link}>Create an account</JoyLink>
            <Button
              type="submit"
              color="primary"
              sx={{
                bgcolor: theme => theme.colorSchemes.light.palette.primary[700],
              }}
              loading={isLoading}
              disabled={!isValid}
            >Sign In</Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;