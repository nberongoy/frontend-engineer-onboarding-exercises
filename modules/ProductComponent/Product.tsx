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
  Spacer,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { FC } from 'react';
import { FaEdit } from 'react-icons/fa';

const Product: FC = () => {
  const product = {
    imageUrl: '/media_placeholder_2.png',
    imageAlt: 'Product image',
    title: 'React JS',
    description:
      'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto. Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
    id: 1,
  };

  return (
    <Box p="110">
      <Box mb="5">
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" width={6} height={10} />}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products" color="gray.400" fontWeight={500}>
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" color="gray.400" fontWeight={500}>
              {product.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box>
        <Flex>
          <Image src={product.imageUrl} alt={product.imageAlt} />

          <Box ml="10">
            <Box d="flex">
              <Heading mb="5">{product.title}</Heading>
              <Spacer />
              <NextLink href={`/product/edit/${product.id}`}>
                <Button mr="2" bg="gray.100" variant="ghost">
                  <Icon as={FaEdit} />
                </Button>
              </NextLink>
              <Button bg="gray.100" variant="ghost">
                <DeleteIcon />
              </Button>
            </Box>
            <Text>{product.description}</Text>
          </Box>
        </Flex>
      </Box>

      <Box width={393} mt="5">
        <NextLink href={`#`}>
          <Button leftIcon={<Image src={'/cart.png'} />} bg="purple.50" color="purple.700" isFullWidth>
            Add to cart
          </Button>
        </NextLink>
      </Box>
    </Box>
  );
};

export default Product;
