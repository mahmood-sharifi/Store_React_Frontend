import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || 'default';
  const page = searchParams.get('page') || '1';
  const [inputValue, setInputValue] = useState(query);
  const navigate = useNavigate();

  
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mb={4} width="100%">
      <TextField
        value={inputValue}
        label="Search Products"
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default SearchBar;
