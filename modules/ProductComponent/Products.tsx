import { useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Grid, Heading, Spacer, useDisclosure } from '@chakra-ui/react';
import Pagination from '@components/Pagination';
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

const setProductPages = (products: IProductEdge[]): Array<IProductEdge[]> => {
  let limit = 1,
    productPage: Array<IProductEdge> = [],
    productPages: Array<IProductEdge[]> = [];

  products.map((product: IProductEdge, i: number) => {
    productPage = [...productPage, product];

    if (limit === 12) {
      productPages = [...productPages, productPage];
      productPage = [];
      limit = 0;
    }

    if (products.length === i + 1 && limit < 12) {
      productPages = [...productPages, productPage];
    }

    limit++;
  });

  return productPages;
};

const Products: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useQuery(FETCH_PRODUCTS, { fetchPolicy: 'cache-and-network', variables: { first: 9999 } });
  const router = useRouter();
  const { pathname } = router;

  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<IProductEdge[]>>([[]]);
  const [product, setProduct] = useState<IProduct>({ id: '', name: '', description: '' });
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    if (data) {
      setProducts(setProductPages(data.products.edges));
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
        {products[currentPage - 1].map((product: IProductEdge, i) => (
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

      <Pagination
        total={data ? data.products.edges.length : 0}
        onPageNumber={(pageNumber: number) => setCurrentPage(pageNumber)}
      />

      <ProductDeleteModal isOpen={isOpen} onClose={onClose} productId={product.id || ''} />
    </Box>
  );
};

export default Products;
