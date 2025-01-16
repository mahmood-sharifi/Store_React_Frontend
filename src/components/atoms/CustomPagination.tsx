import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';

interface CustomPaginationProps {
  total: number;
  limit: number;
  skip: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ total, limit, skip, onPageChange }) => {
  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'default';

  return (
    <Pagination
      page={currentPage}
      count={pageCount}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/?query=${query}&sort=${sort}&page=${item.page}`}
          {...item}
        />
      )}
      onChange={(event, page) => onPageChange(page)}
    />
  );
};

export default CustomPagination;
