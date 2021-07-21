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
  LinkOverlay,
} from '@chakra-ui/react';
import React, { FC } from 'react';

const Login: FC = () => {
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
          <form>
            <FormControl mt="5" id="email">
              <FormLabel>Email </FormLabel>
              <Input type="email" placeholder="email@example.com" />
            </FormControl>

            <FormControl mt="5" id="password">
              <FormLabel>Password </FormLabel>
              <Input type="pasword" placeholder="********" />
              <FormHelperText textAlign="right">
                <LinkOverlay color="purple.500" href="#">
                  Forgot Password
                </LinkOverlay>
              </FormHelperText>
            </FormControl>

            <Button mt="10" colorScheme="purple" isFullWidth>
              Log in
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default Login;
