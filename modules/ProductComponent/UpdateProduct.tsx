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
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@styles/Product.module.css';
import Router from 'next/router';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { productForm } from './validation';

interface IProductFormData {
  title: string;
  description: string;
}

const UpdateProduct: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductFormData>({
    resolver: yupResolver(productForm),
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<IProductFormData> = async () => {
    toast({
      title: `Successfully updated a product!`,
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });
    await Router.push('/products');
  };

  const onCancel = async (): Promise<void> => {
    await Router.push('/products');
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
              Edit Product
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box className={styles.formProductCard} p="62">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="repeat(6, 1fr)" gap={1}>
            <GridItem colSpan={2}>
              <FormControl id="photo">
                <FormLabel>Photo </FormLabel>
                <input type="file" />
              </FormControl>
            </GridItem>

            <GridItem colSpan={4} b>
              <FormControl id="type">
                <FormLabel>Type </FormLabel>
                <Input type="text" placeholder="Enter Title" {...register('title')} />
                <FormHelperText color="red.500">{errors.title?.message}</FormHelperText>
              </FormControl>

              <FormControl mt="5" id="description">
                <FormLabel>Description </FormLabel>
                <Textarea rows={2} type="text" placeholder="Enter Description" {...register('description')} />
                <FormHelperText color="red.500">{errors.description?.message}</FormHelperText>
              </FormControl>

              <Box mt="10" textAlign="right">
                <Button variant="outline" mr="4" width={178} onClick={onCancel}>
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
