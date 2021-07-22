import { Box, Button, Image, Text } from '@chakra-ui/react';
import styles from '@styles/Product.module.css';
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
    <NextLink href={`/product/${product.id}`}>
      <Box className={styles.productCard} width={290} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Image src={product.imageUrl} alt={product.imageAlt} />

        <Box p="6">
          <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
            {product.title}
          </Box>

          <Box mt="1" fontWeight={400}>
            <Text>{product.description}</Text>
          </Box>

          <Box d="flex" mt="2">
            <NextLink href={`#`}>
              <Button leftIcon={<Image src={'/cart.png'} />} bg="purple.50" color="purple.700" isFullWidth>
                Add to cart
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </NextLink>
  );
};

export default ProductCard;
