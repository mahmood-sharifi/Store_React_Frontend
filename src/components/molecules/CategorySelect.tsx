import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface CategorySelectProps {
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  categories?: { id: string; name: string }[]; 
  label?: string;
  allowUnselect?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategoryId,
  onCategoryChange,
  categories = [],
  label = 'Category',
  allowUnselect = false,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    onCategoryChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedCategoryId}
        label="Category"
        onChange={handleCategoryChange}
      >
        {allowUnselect && (
          <MenuItem value="">Unselect</MenuItem>  
        )}
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
