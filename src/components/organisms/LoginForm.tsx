import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useLoginMutation } from '../../features/auth/authQuery'
import { useDispatch } from 'react-redux'
import { setToken } from '../../features/auth/authSlice'
import { Box, Typography, Alert, Link } from '@mui/material';
import { useGetCurrentUserQuery } from '../../features/user/userQuery';

// Define the Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginForm = () => {
  const [login, { isLoading, isError }] = useLoginMutation()
  const dispatch = useDispatch()
  // const { refetch: fetchProfile } = useGetCurrentUserQuery(undefined, { skip: true });

 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Perform login mutation
      const result = await login(data).unwrap()
      console.log(result)
      dispatch(setToken(result.token)) // Dispatch setToken to save the token in Redux
      // await fetchProfile();
      
      console.log('Login successful, token saved in Redux and localStorage')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Login
      </Typography>

      {isError && <Alert severity="error">Login failed. Please try again.</Alert>}

      <Input
        label="Email"
        type="email"
        register={register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        register={register('password', { required: 'Password is required' })}
        error={errors.password?.message}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        Don’t have an account?{' '}
        <Link href="/register" underline="hover">
          Register
        </Link>
      </Typography>
    </Box>
  )
}

export default LoginForm
