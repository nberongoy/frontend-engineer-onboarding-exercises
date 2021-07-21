import { Box, Button, Center, Divider, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { FC } from 'react';

const SignUp: FC = () => (
  <Center>
    <Box borderWidth="1px" mt="50" width={600}>
      <Box pt="30" pb="5">
        <Center>
          <Heading>Sign up</Heading>
        </Center>
      </Box>

      <Divider />
      <Box p="5">
        <form>
          <FormControl mt="5" id="firstname">
            <FormLabel>First name </FormLabel>
            <Input type="text" placeholder="Enter first name" />
          </FormControl>

          <FormControl mt="5" id="lastname">
            <FormLabel>Last name </FormLabel>
            <Input type="text" placeholder="Enter last name" />
          </FormControl>

          <FormControl mt="5" id="email">
            <FormLabel>Email </FormLabel>
            <Input type="email" placeholder="email@example.com" />
          </FormControl>

          <FormControl mt="5" id="password">
            <FormLabel>Password </FormLabel>
            <Input type="password" placeholder="Enter password" />
          </FormControl>

          <FormControl mt="5" id="confirmpassword">
            <FormLabel>Confirm Password </FormLabel>
            <Input type="password" placeholder="Confirm password" />
          </FormControl>

          <Button mt="8" colorScheme="purple" isFullWidth>
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  </Center>
);

export default SignUp;
