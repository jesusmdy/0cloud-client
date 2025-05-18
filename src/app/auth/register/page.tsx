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
import { KeyIcon, EyeIcon, EyeSlashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import JoyLink from "@mui/joy/Link";

interface RegisterFormFields {
  email: string
  displayName: string
  password: string
  confirmPassword: string
}

const schema = yup.object({
  email: yup.string().email('Email must be a valid email').required('Email is required'),
  displayName: yup.string().required('Display name is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null as never], 'Passwords must match'),
})

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterFormFields>({
    resolver: yupResolver(schema),
  })

  const router = useRouter()


  const [error, setError] = useState<boolean>(false)

  const onSubmit = (data: RegisterFormFields) => {
    setIsLoading(true)
    api.post<{
      token: string
    }>('/register', {
      ...data,
      display_name: data.displayName
    })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem('token', token)
        router.push('/auth/login')
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
        Error while registering your account, try again later.
      </Snackbar>
      <div className="w-full p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Box>
            <Typography level="h4">Register</Typography>
            <Typography level="body-xs">Create a new account and start saving files</Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Label htmlFor="email" required>Your email</Label>
              <Input
                type="email" {...register("email")} id="email" disabled={isLoading}
                startDecorator={<EnvelopeIcon className="w-4" />}
              />
              {errors.email && <Typography level="body-xs" className="text-red-500">{errors.email.message}</Typography>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Label htmlFor="displayName" required>Display Name</Label>
              <Input type="text" {...register("displayName")} id="displayName" disabled={isLoading} />
              {errors.displayName && <Typography level="body-xs" className="text-red-500">{errors.displayName.message}</Typography>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Label htmlFor="password" required>New password</Label>
              <Input
                startDecorator={<KeyIcon className="w-4" />} type={showPassword ? "text" : "password"} {...register("password")} id="password" disabled={isLoading}
                endDecorator={
                  showPassword ? (
                    <EyeSlashIcon className="w-4" onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeIcon className="w-4" onClick={() => setShowPassword(true)} />
                  )
                }
              />
              {errors.password && <Typography level="body-xs" className="text-red-500">{errors.password.message}</Typography>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Label htmlFor="confirmPassword" required>Confirm password</Label>
              <Input
                startDecorator={<KeyIcon className="w-4" />} type={showPassword ? "text" : "password"} {...register("confirmPassword")} id="confirmPassword" disabled={isLoading}
                endDecorator={
                  showPassword ? (
                    <EyeSlashIcon className="w-4" onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeIcon className="w-4" onClick={() => setShowPassword(true)} />
                  )
                }
              />
              {errors.confirmPassword && <Typography level="body-xs" className="text-red-500">{errors.confirmPassword.message}</Typography>}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button
              type="submit"
              color="primary"
              sx={{
                bgcolor: theme => theme.colorSchemes.light.palette.primary[700],
              }}
              loading={isLoading}
              disabled={!isValid}
            >Register</Button>
            <JoyLink href="/auth/login" component={Link} fontSize="sm">Already have an account</JoyLink>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;