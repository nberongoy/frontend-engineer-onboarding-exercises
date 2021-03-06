import { useMutation, useQuery } from '@apollo/client';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Upload from '@components/Upload';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@styles/Product.module.css';
import { UPDATE_PRODUCT } from 'apollo/mutations/product';
import { FETCH_PRODUCTS } from 'apollo/queries/products';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { productForm } from './validation';

interface IProductFormData {
  name: string;
  description: string;
}

const UpdateProduct: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useQuery(FETCH_PRODUCTS, { variables: { filter: { id: { eq: id } } } });

  const [productId, setProductId] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IProductFormData>({
    resolver: yupResolver(productForm),
  });

  useEffect(() => {
    if (data) {
      const { products } = data;
      const { edges } = products;
      const { node } = edges[0];
      setValue('name', node.name, { shouldDirty: true });
      setValue('description', node.description, { shouldDirty: true });
      setProductId(node.id);
    }
  }, [setValue, data]);

  const toast = useToast();
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const onSubmit: SubmitHandler<IProductFormData> = async (updateData) => {
    try {
      await updateProduct({ variables: { input: { id: productId, body: { ...updateData } } } });

      toast({
        title: `Successfully updated a product!`,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      await Router.push('/products');
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        position: 'top',
        isClosable: true,
      });
    }
  };

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
              Edit Product
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box className={styles.formProductCard} p="62">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(6, 1fr)" gap={6}>
            <GridItem colSpan={2}>
              <FormControl id="photo">
                <FormLabel>Photo </FormLabel>
                <Upload />
              </FormControl>
            </GridItem>

            <GridItem colSpan={4}>
              <FormControl id="type">
                <FormLabel>Title </FormLabel>
                <Input type="text" placeholder="Enter Title" {...register('name')} />
                <FormHelperText color="red.500">{errors.name?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="description">
                <FormLabel>Description </FormLabel>
                <Textarea rows={2} type="text" placeholder="Enter Description" {...register('description')} />
                <FormHelperText color="red.500">{errors.description?.message}</FormHelperText>
              </FormControl>

              <Box mt="10" textAlign="right">
                <Button variant="outline" mr="4" width={178} onClick={() => Router.back()}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="purple" width={178}>
                  Submit
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
