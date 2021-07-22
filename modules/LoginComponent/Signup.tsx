import { Box, Button, Center, Divider, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupForm } from './validation';

interface ISignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>({
    resolver: yupResolver(signupForm),
  });

  const onSignup: SubmitHandler<ISignupFormData> = () => {
    localStorage.setItem('signup', 'did sign up');
  };

  return (
    <Center>
      <Box borderWidth="1px" mt="50" width={600}>
        <Box pt="30" pb="5">
          <Center>
            <Heading>Sign up</Heading>
          </Center>
        </Box>

        <Divider />
        <Box p="5">
          <form onSubmit={handleSubmit(onSignup)}>
            <FormControl mt="5" id="firstname">
              <FormLabel>First name </FormLabel>
              <Input type="text" placeholder="Enter first name" {...register('firstName')} />
              <FormHelperText color="red.500">{errors.firstName?.message}</FormHelperText>
            </FormControl>

            <FormControl mt="5" id="lastname">
              <FormLabel>Last name </FormLabel>
              <Input type="text" placeholder="Enter last name" {...register('lastName')} />
              <FormHelperText color="red.500">{errors.lastName?.message}</FormHelperText>
            </FormControl>

            <FormControl mt="5" id="email">
              <FormLabel>Email </FormLabel>
              <Input type="text" placeholder="email@example.com" {...register('email')} />
              <FormHelperText color="red.500">{errors.email?.message}</FormHelperText>
            </FormControl>

            <FormControl mt="5" id="password">
              <FormLabel>Password </FormLabel>
              <Input type="password" placeholder="Enter password" {...register('password')} />
              <FormHelperText color="red.500">{errors.password?.message}</FormHelperText>
            </FormControl>

            <FormControl mt="5" id="confirmpassword">
              <FormLabel>Confirm Password </FormLabel>
              <Input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
              <FormHelperText color="red.500">{errors.confirmPassword?.message}</FormHelperText>
            </FormControl>

            <Button mt="8" type="submit" colorScheme="purple" isFullWidth>
              Sign up
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default SignUp;
