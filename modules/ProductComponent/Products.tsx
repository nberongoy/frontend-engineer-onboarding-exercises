import { Box, Divider, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import ProductCard from './ProductCard';

const Products: FC = () => (
  <Box p="110">
    <Box mb="10">
      <Heading>Products</Heading>
    </Box>

    <Divider />

    <Box mt="10">
      <ProductCard />
    </Box>
  </Box>
);

export default Products;
