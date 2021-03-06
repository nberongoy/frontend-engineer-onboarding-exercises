import { Box, Button, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import styles from '@styles/Product.module.css';
import { isLoggedIn } from '@utils/helper/auth';
import NextLink from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { MdShoppingCart } from 'react-icons/md';
import { IProduct } from './Products';

interface IProductCard {
  product: IProduct;
  onDelete: (product: IProduct) => void;
}
const ProductCard: FC<IProductCard> = ({ product, onDelete }) => {
  const [hasLoggedIn, setHasLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setHasLoggedIn(isLoggedIn());
  }, []);

  product = {
    ...product,
    imageUrl: '/media_placeholder_2.png',
    imageAlt: 'Product image',
  };

  return (
    <Box
      className={styles.productCard}
      maxW={'80em'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
    >
      <Box>
        {hasLoggedIn ? (
          <Box className={styles.productMenuDropdown}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                isRound={true}
                icon={<BiDotsVerticalRounded color="#374151" fontSize={20} />}
                variant="outline"
                bg="white"
              />
              <MenuList>
                <NextLink href={`/product/edit/${product.id}`}>
                  <MenuItem>Edit</MenuItem>
                </NextLink>
                <MenuItem onClick={() => onDelete(product)}>Delete</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          ''
        )}
        <NextLink href={`/product/${product.id}`}>
          <Image src={product.imageUrl} alt={product.imageAlt} className={styles.cardImage} />
        </NextLink>
      </Box>

      <Box p="6">
        <NextLink href={`/product/${product.id}`}>
          <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {product.name}
          </Box>
        </NextLink>

        <Box mt="1" fontWeight={400}>
          <Text>{product.description}</Text>
        </Box>

        <Box d="flex" mt="2">
          <Button leftIcon={<MdShoppingCart />} bg="purple.50" color="purple.700" isFullWidth>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
