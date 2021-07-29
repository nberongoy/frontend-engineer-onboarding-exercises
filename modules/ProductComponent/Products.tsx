import { useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Grid, Heading, Spacer, useDisclosure } from '@chakra-ui/react';
import { isLoggedIn } from '@utils/helper/auth';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDeleteModal from './DeleteProdcut';
import ProductCard from './ProductCard';

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface IProductEdge {
  cursor: string;
  node: IProduct;
}

const Products: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(FETCH_PRODUCTS, { fetchPolicy: 'cache-and-network', variables: { first: 9999 } });
  const router = useRouter();
  const { pathname } = router;

  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductEdge[]>([]);
  const [product, setProduct] = useState<IProduct>({ id: '', name: '', description: '' });

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    if (data) {
      setProducts(data.products.edges);
    }
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
            <ProductCard
              product={product.node}
              onDelete={(productDelete: IProduct) => {
                setProduct(productDelete);
                onOpen();
              }}
            />
          </Box>
        ))}
      </Grid>

      <ProductDeleteModal isOpen={isOpen} onClose={onClose} productId={product.id || ''} />
    </Box>
  );
};

export default Products;
