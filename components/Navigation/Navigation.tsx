import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import styles from '@styles/Navigation.module.css';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { FC } from 'react';

const Navigation: FC = () => (
  <Flex p="2" backgroundColor="white" className={styles.navigationContainer}>
    <Box ml="24" p="2">
      <NextLink href="/">
        <NextImage src="/Logo.png" width={143} height={32} className={styles.companyLogo} />
      </NextLink>
    </Box>
    <Spacer />
    <Box mr="24" p="2">
      <NextLink href="/login">
        <Button variant="outline" mr="4">
          Login
        </Button>
      </NextLink>
      <NextLink href="/signup">
        <Button colorScheme="purple">Sign up</Button>
      </NextLink>
    </Box>
  </Flex>
);

export default Navigation;
