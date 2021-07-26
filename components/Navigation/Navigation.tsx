import { Avatar, Box, Button, Flex, Spacer, Wrap, WrapItem } from '@chakra-ui/react';
import styles from '@styles/Navigation.module.css';
import { navigationMenu } from '@utils/constants/navigation';
import { isLoggedIn } from '@utils/helper/auth';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';

const Navigation: FC = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, [router.pathname]);

  return (
    <Box backgroundColor="white" className={styles.navigationContainer}>
      <Flex>
        <Box ml="24" p="4">
          <NextLink href="/">
            <NextImage src="/Logo.png" width={143} height={32} className={styles.companyLogo} />
          </NextLink>
        </Box>
        {navigationMenu.map((item, index) => {
          return (
            <Box key={index} ml="5" mt="5" className={router.pathname === item.path ? styles.activeLink : ''}>
              <NextLink href={item.path}>{item.title}</NextLink>
            </Box>
          );
        })}
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
