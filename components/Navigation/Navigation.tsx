import { Avatar, Box, Button, Flex, Spacer, Wrap, WrapItem } from '@chakra-ui/react';
import styles from '@styles/Navigation.module.css';
import { isLoggedIn } from '@utils/helper/auth';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';

const Navigation: FC = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, []);

  return (
    <Box p="2" backgroundColor="white" className={styles.navigationContainer}>
      <Flex>
        <Box ml="24" p="2">
          <NextLink href="/">
            <NextImage src="/Logo.png" width={143} height={32} className={styles.companyLogo} />
          </NextLink>
        </Box>
        <Spacer />
        <Box mr="24" p="2">
          {!hasLoggedIn ? (
            <>
              <NextLink href="/login">
                <Button variant="outline" mr="4">
                  Login
                </Button>
              </NextLink>
              <NextLink href="/signup">
                <Button colorScheme="purple">Sign up</Button>
              </NextLink>
            </>
          ) : (
            <Wrap>
              <WrapItem>
                <Box pt="3" mr="4">
                  <BiBell fontSize={24} color="#9CA3AF" />
                </Box>
              </WrapItem>
              <WrapItem>
                <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
              </WrapItem>
            </Wrap>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navigation;
