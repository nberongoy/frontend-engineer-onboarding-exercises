import { useQuery } from '@apollo/client';
import { ChevronRightIcon, DeleteIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import styles from '@styles/Product.module.css';
import { isLoggedIn } from '@utils/helper/auth';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import ProductDeleteModal from './DeleteProdcut';
import { IProduct } from './Products';

const Product: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(FETCH_PRODUCTS, { variables: { filter: { id: { eq: id } } } });

  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({
    id: '',
    description: '',
    name: '',
    imageUrl: '/media_placeholder_2.png',
    imageAlt: 'Product image',
  });

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, []);

  useEffect(() => {
    if (data) {
      const { products } = data;
      const { edges } = products;
      const { node } = edges[0];
      setProduct({ ...product, ...node });
    }
  }, [data]);

  return (
    <Box p="110" pt="50">
      <Box mb="5">
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" width={6} height={10} />}>
          <BreadcrumbItem>
            <NextLink href="/products">
              <Text color="gray.400" fontWeight={500} cursor="pointer">
                Products
              </Text>
            </NextLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="gray.400" fontWeight={500}>
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box>
        <Flex>
          <Image src={product.imageUrl} alt={product.imageAlt} />

          <Box ml="10">
            <Flex mb="5">
              <Heading>{product.name}</Heading>

              {hasLoggedIn ? (
                <div className={styles.productViewButton}>
                  <NextLink href={`/product/edit/${product.id}`}>
                    <Button mr="2" bg="gray.100" variant="ghost">
                      <Icon as={FaEdit} />
                    </Button>
                  </NextLink>
                  <Button bg="gray.100" variant="ghost" onClick={onOpen}>
                    <DeleteIcon />
                  </Button>
                </div>
              ) : (
                ''
              )}
            </Flex>
            <Text>{product.description}</Text>
          </Box>
        </Flex>
      </Box>

      <Box width={393} mt="5">
        <NextLink href={`#`}>
          <Button leftIcon={<MdShoppingCart />} bg="purple.50" color="purple.700" isFullWidth>
            Add to cart
          </Button>
        </NextLink>
      </Box>

      <ProductDeleteModal isOpen={isOpen} onClose={onClose} productId={product.id || ''} />
    </Box>
  );
};

export default Product;
