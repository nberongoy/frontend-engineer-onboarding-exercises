import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

const ProductCard: FC = () => {
  const property = {
    imageUrl: '/media_placeholder.jpg',
    imageAlt: 'Product image',
    title: 'React JS',
    description:
      'Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minus quidem ipsam quia iusto.',
  };

  return (
    <Box width={290} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {property.title}
        </Box>

        <Box mt="1" fontWeight={400}>
          <Text>{property.description}</Text>
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
