import { Box, Button, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import styles from '@styles/Product.module.css';
import NextImage from 'next/image';
import NextLink from 'next/link';
import React, { FC } from 'react';

const ProductCard: FC = () => {
  const product = {
    imageUrl: '/media_placeholder.jpg',
    imageAlt: 'Product image',
    title: 'React JS',
    description:
      'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
    id: 1,
  };

  return (
    <Box className={styles.productCard} maxW={'80em'} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box>
        <Box className={styles.productMenuDropdown}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              isRound={true}
              icon={<NextImage src="/menu_dropdown.png" width={4} height={16} className={styles.companyLogo} />}
              variant="outline"
              bg="white"
            />
            <MenuList>
              <NextLink href={`/product/edit/${product.id}`}>
                <MenuItem>Edit</MenuItem>
              </NextLink>
              <MenuItem>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <NextLink href={`/product/${product.id}`}>
          <Image src={product.imageUrl} alt={product.imageAlt} />
        </NextLink>
      </Box>

      <Box p="6">
        <NextLink href={`/product/${product.id}`}>
          <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {product.title}
          </Box>
        </NextLink>

        <Box mt="1" fontWeight={400}>
          <Text>{product.description}</Text>
        </Box>

        <Box d="flex" mt="2">
          <Button leftIcon={<Image src={'/cart.png'} />} bg="purple.50" color="purple.700" isFullWidth>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
