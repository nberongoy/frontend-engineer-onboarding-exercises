import { Box, Spacer, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { SiDribbble, SiFacebook, SiGithub, SiInstagram, SiTwitter } from 'react-icons/si';

const Footer: FC = () => (
  <Box pt="20" pb="20" pl="114" pr="114" backgroundColor="white" d="flex">
    <Text>© 2020 HOV Onboarding. All rights reserved.</Text>
    <Spacer />
    <Box mr="2">
      <SiFacebook fontSize={20} color="#9CA3AF" />
    </Box>
    <Box mr="2">
      <SiInstagram fontSize={20} color="#9CA3AF" />
    </Box>
    <Box mr="2">
      <SiTwitter fontSize={20} color="#9CA3AF" />
    </Box>
    <Box mr="2">
      <SiGithub fontSize={20} color="#9CA3AF" />
    </Box>
    <Box mr="2">
      <SiDribbble fontSize={20} color="#9CA3AF" />
    </Box>
  </Box>
);

export default Footer;
