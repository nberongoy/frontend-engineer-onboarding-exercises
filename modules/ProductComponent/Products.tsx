import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Grid, Heading, Spacer } from '@chakra-ui/react';
import { isLoggedIn } from '@utils/helper/auth';
import NextLink from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const Products: FC = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, []);

  return (
    <Box p="110">
      <Box mb="10" d="flex">
        <Heading>Products</Heading>
        <Spacer />
        {hasLoggedIn ? (
          <NextLink href={`/product/create`}>
            <Button leftIcon={<AddIcon />} colorScheme="purple" fontWeight={600}>
              Add Product
            </Button>
          </NextLink>
        ) : (
          ''
        )}
      </Box>

      <Divider />
      <Grid templateColumns="repeat(4, 1fr)" gap={3}>
        {Array(20)
          .fill('')
          .map((_, i) => (
            <Box mt="10" key={i}>
              <ProductCard />
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export default Products;
