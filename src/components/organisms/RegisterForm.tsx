import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../features/auth/authQuery';
import { useDispatch } from 'react-redux';
import { Box, Typography, Alert, Link } from '@mui/material';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import AvatarUpload from '../atoms/AvatarUpload';

interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File;
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterFormData>();
  const [registerUser, { isLoading, isError }] = useRegisterMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('avatar', data.avatar);  // Append avatar file

    try {
      const result = await registerUser(formData).unwrap();
      console.log('User registered:', result);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

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
        Register
      </Typography>

      {isError && <Alert severity="error">Registration failed. Please try again.</Alert>}

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

      <Input
        label="First Name"
        type="text"
        register={register('firstName', { required: 'First Name is required' })}
        error={errors.firstName?.message}
      />

      <Input
        label="Last Name"
        type="text"
        register={register('lastName', { required: 'Last Name is required' })}
        error={errors.lastName?.message}
      />

      {/* Avatar Upload */}
      <AvatarUpload
        label="Upload Avatar"
        setValue={(file: File) => setValue('avatar', file)}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>

      <Typography align="center" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link href="/login" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
