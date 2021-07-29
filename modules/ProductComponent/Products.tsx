import { useQuery } from '@apollo/client';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonProps, Divider, Grid, Heading, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { isLoggedIn } from '@utils/helper/auth';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
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

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<IProductEdge[]>>([[]]);
  const [product, setProduct] = useState<IProduct>({ id: '', name: '', description: '' });

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, [pathname]);

  useEffect(() => {
    if (data) {
      setProducts(setProductPages(data.products.edges));
    }
  }, [data]);

  const { isDisabled, currentPage, setCurrentPage, pagesQuantity } = usePaginator({
    total: data ? data.products.edges.length : 0,
    initialState: {
      pageSize: 12,
      currentPage: 1,
      isDisabled: false,
    },
  });

  // styles
  const baseStyles: ButtonProps = {
    w: 10,
    fontSize: 14,
    borderRadius: 0,
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'transparent',
      color: '#4F46E5',
    },
    bg: 'transparent',
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: 'transparent',
    },
    bg: 'transparent',
    color: '#4F46E5',
    borderTopWidth: 1,
    borderTopColor: '#4F46E5',
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'transparent',
  };

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

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

      <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={currentPage}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={handlePageChange}
      >
        <Container mt="5" align="center" justify="space-between" w="full" p={4}>
          <Previous bg="transparent">
            <CgArrowLongLeft /> <Text ml="5">Previous</Text>
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next bg="transparent">
            <Text mr="5">Next</Text> <CgArrowLongRight />
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>

      <ProductDeleteModal isOpen={isOpen} onClose={onClose} productId={product.id || ''} />
    </Box>
  );
};

export default Products;
