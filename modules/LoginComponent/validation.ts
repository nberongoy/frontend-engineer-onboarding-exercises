import * as yup from 'yup';

export const loginForm = yup.object().shape({
  email: yup.string().required('Email is required.').email('Please input an email.'),
  password: yup.string().required('Password is required.'),
});

export const signupForm = yup.object().shape({
  firstname: yup.string().required('Frist name is required.'),
  lastname: yup.string().required('Last name is required.'),
  email: yup.string().required('Email is required.').email('Please input an email.'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup.string().required('Confirm password is required.'),
});
