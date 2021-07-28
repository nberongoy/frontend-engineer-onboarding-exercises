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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { isLoggedIn } from '@utils/helper/auth';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { IProduct } from './Products';

const Product: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(FETCH_PRODUCTS, {
    fetchPolicy: 'cache-and-network',
    variables: { first: 1, filter: { id: { eq: id } } },
  });

  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>({
    name: '',
    description: '',
    id: '',
    imageUrl: '/media_placeholder_2.png',
    imageAlt: 'Product image',
  });

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
    if (data)
      setProduct({
        ...product,
        ...data.products.edges[0].node,
      });
  }, [data, product]);

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
            <Box d="flex">
              <Heading mb="5">{product.name}</Heading>
              {hasLoggedIn ? (
                <>
                  <Spacer />

                  <NextLink href={`/product/edit/${product.id}`}>
                    <Button mr="2" bg="gray.100" variant="ghost">
                      <Icon as={FaEdit} />
                    </Button>
                  </NextLink>
                  <Button bg="gray.100" variant="ghost" onClick={onOpen}>
                    <DeleteIcon />
                  </Button>
                </>
              ) : (
                ''
              )}
            </Box>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete this product? You can’t undo this action afterwards.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Product;
