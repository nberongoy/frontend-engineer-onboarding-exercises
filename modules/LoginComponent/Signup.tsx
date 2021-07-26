import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@styles/Signup.module.css';
import { SIGN_UP } from 'apollo/mutations/user';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signupForm } from './validation';

interface ISignupFormData {
  firstname: string;
  lastname: string;
  emailAddress: string;
  password: string;
  confirmPassword?: string;
}

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>({
    resolver: yupResolver(signupForm),
  });
  const toast = useToast();
  const [signupUser] = useMutation(SIGN_UP);

  const onSignup: SubmitHandler<ISignupFormData> = async (signupData) => {
    try {
      delete signupData.confirmPassword;
      const { data } = await signupUser({ variables: { input: signupData } });
      const { signUp } = data;

      localStorage.setItem('token', signUp.token);
      window.location.href = '/products';
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Center>
        <Box borderWidth="1px" mt="50" width={600} background="white" className={styles.signUpForm}>
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
                <Input type="text" placeholder="Enter first name" {...register('firstname')} />
                <FormHelperText color="red.500">{errors.firstname?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="lastname">
                <FormLabel>Last name </FormLabel>
                <Input type="text" placeholder="Enter last name" {...register('lastname')} />
                <FormHelperText color="red.500">{errors.lastname?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="emailAddress">
                <FormLabel>Email </FormLabel>
                <Input type="text" placeholder="email@example.com" {...register('emailAddress')} />
                <FormHelperText color="red.500">{errors.emailAddress?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="password">
                <FormLabel>Password </FormLabel>
                <Input type="password" placeholder="Enter password" {...register('password')} />
                <FormHelperText color="red.500">{errors.password?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="confirmPassword">
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
    </div>
  );
};

export default SignUp;
