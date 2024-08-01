import * as Z from 'zod';

export const registrationSchema = Z.object({
  firstName: Z.string().min(1, 'First Name is required'),
  lastName: Z.string().min(1, 'Last Name is required'),
  email: Z.string().email('Invalid email address'),
  password: Z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: Z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export const loginSchema = Z.object({
  email: Z.string({
    required_error: 'Email is required',
  }).email('Invalid email'),
  password: Z.string().min(6, 'Password must be at least 6 characters'),
});
