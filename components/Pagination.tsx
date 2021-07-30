import { ButtonProps, Text } from '@chakra-ui/react';
import { Container, Next, PageGroup, Paginator, Previous, usePaginator } from 'chakra-paginator';
import React from 'react';
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';

export interface PaginationProps {
  total: number;
  onPageNumber: (pageNumber: number) => void;
}

// styles
const baseStyles: ButtonProps = {
  w: 10,
  fontSize: 14,
  borderRadius: 0,
};

const normalStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: 'transparent',
    color: '#4F46E5',
  },
  bg: 'transparent',
};

const activeStyles: ButtonProps = {
  ...baseStyles,
  _hover: {
    bg: 'transparent',
  },
  bg: 'transparent',
  color: '#4F46E5',
  borderTopWidth: 1,
  borderTopColor: '#4F46E5',
};

const separatorStyles: ButtonProps = {
  w: 7,
  bg: 'transparent',
};

const Pagination: React.FC<PaginationProps> = ({ total, onPageNumber }) => {
  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const { isDisabled, currentPage, setCurrentPage, pagesQuantity } = usePaginator({
    total: total,
    initialState: {
      pageSize: 12,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    onPageNumber(pageNumber);
  };

  return (
    <Paginator
      isDisabled={isDisabled}
      activeStyles={activeStyles}
      innerLimit={innerLimit}
      currentPage={currentPage}
      outerLimit={outerLimit}
      normalStyles={normalStyles}
      separatorStyles={separatorStyles}
      pagesQuantity={pagesQuantity}
      onPageChange={handlePageChange}
    >
      <Container mt="5" align="center" justify="space-between" w="full" p={4}>
        <Previous bg="transparent">
          <CgArrowLongLeft /> <Text ml="5">Previous</Text>
        </Previous>
        <PageGroup isInline align="center" />
        <Next bg="transparent">
          <Text mr="5">Next</Text> <CgArrowLongRight />
        </Next>
      </Container>
    </Paginator>
  );
};

export default Pagination;
