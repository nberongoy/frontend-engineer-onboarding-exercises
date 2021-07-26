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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginForm } from './validation';

interface ILoginFormData {
  email: string;
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

  const onLogin: SubmitHandler<ILoginFormData> = () => {
    localStorage.setItem('token', 'isLoggedIn');
    window.location.href = '/products';
  };

  return (
    <Center>
      <Box borderWidth="1px" mt="50" width={600}>
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
              <Input type="text" placeholder="email@example.com" {...register('email')} />
              <FormHelperText color="red.500">{errors.email?.message}</FormHelperText>
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
