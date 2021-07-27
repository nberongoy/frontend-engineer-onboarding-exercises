import { useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Grid, Heading, Spacer } from '@chakra-ui/react';
import { isLoggedIn } from '@utils/helper/auth';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface IProductEdge {
  cursor: string;
  node: IProduct;
}

const Products: FC = ({}) => {
  const { data } = useQuery(FETCH_PRODUCTS, { variables: { first: 9999 } });
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductEdge[]>([]);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    if (data) setProducts(data.products.edges);
  }, [data]);

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
        {products.map((product: IProductEdge, i) => (
          <Box mt="10" key={i}>
            <ProductCard product={product.node} />
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
