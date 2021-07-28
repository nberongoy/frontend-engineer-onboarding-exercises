import { useMutation } from '@apollo/client';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { DELETE_PRODUCT } from 'apollo/mutations/product';
import Router from 'next/router';
import React, { FC } from 'react';

interface IDeleteProductsProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

const ProductDeleteModal: FC<IDeleteProductsProps> = ({ isOpen, onClose, productId }) => {
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const toast = useToast();

  const onDelete = async (): Promise<any> => {
    try {
      await deleteProduct({ variables: { input: { id: productId } } });
      toast({
        title: `Successfully deleted a product!`,
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
      onClose();
    }
  };
  return (
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
          <Button colorScheme="red" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDeleteModal;
