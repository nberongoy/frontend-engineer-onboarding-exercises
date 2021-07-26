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
  LinkBox,
  LinkOverlay,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AUTHENTICATE } from 'apollo/mutations/user';
import Router from 'next/router';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginForm } from './validation';

interface ILoginFormData {
  emailAddress: string;
  password: string;
}

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginForm),
  });

  const toast = useToast();
  const [authenticateUser] = useMutation(AUTHENTICATE);

  const onLogin: SubmitHandler<ILoginFormData> = async (loginData) => {
    try {
      const { data } = await authenticateUser({ variables: { input: loginData } });
      const { authenticate } = data;

      localStorage.setItem('token', authenticate.token);
      await Router.push('/products');
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
    <Center>
      <Box borderWidth="1px" mt="50" width={600} bg="white">
        <Box pt="30" pb="5">
          <Center>
            <Heading>Log in</Heading>
          </Center>
        </Box>

        <Divider />
        <Box p="5">
          <form onSubmit={handleSubmit(onLogin)}>
            <FormControl mt="5" id="email">
              <FormLabel>Email </FormLabel>
              <Input type="text" placeholder="email@example.com" {...register('emailAddress')} />
              <FormHelperText color="red.500">{errors.emailAddress?.message}</FormHelperText>
            </FormControl>

            <FormControl mt="5" id="password">
              <FormLabel>Password </FormLabel>
              <Input type="pasword" placeholder="********" {...register('password')} />
              <FormHelperText color="red.500">{errors.password?.message}</FormHelperText>
            </FormControl>

            <LinkBox textAlign="right">
              <LinkOverlay color="purple.500" href="#">
                Forgot Password
              </LinkOverlay>
            </LinkBox>

            <Button type="submit" mt="10" colorScheme="purple" isFullWidth>
              Log in
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
