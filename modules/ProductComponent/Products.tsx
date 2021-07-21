import { Box, Divider, Grid, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import ProductCard from './ProductCard';

const Products: FC = () => (
  <Box p="110">
    <Box mb="10">
      <Heading>Products</Heading>
    </Box>

    <Divider />
    <Grid templateColumns="repeat(5, 1fr)" gap={10}>
      {Array(20)
        .fill('')
        .map(() => (
          // eslint-disable-next-line react/jsx-key
          <Box mt="10">
            <ProductCard />
          </Box>
        ))}
    </Grid>
  </Box>
);

export default Products;
