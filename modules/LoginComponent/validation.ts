import * as yup from 'yup';

export const loginForm = yup.object().shape({
  emailAddress: yup.string().required('Email is required.').email('Please input an email.'),
  password: yup.string().required('Password is required.'),
});

export const signupForm = yup.object().shape({
  firstname: yup.string().required('First name is required.'),
  lastname: yup.string().required('Last name is required.'),
  emailAddress: yup.string().required('Email is required.').email('Please input an email.'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required.')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
