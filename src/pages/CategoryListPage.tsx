import React from 'react';
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from '../features/categories/categoryQuery';
import { Box, Typography, List } from '@mui/material';
import CategoryCard from '../components/molecules/CategoryCard'; 
import Button from '../components/atoms/Button'; 
import { useNavigate } from 'react-router-dom';

const CategoryListPage: React.FC = () => {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery({});
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      alert('Category deleted successfully');
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  const handleAddCategoryClick = () => {
    navigate('/add-category'); 
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading categories</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Category List
      </Typography>
      <div onClick={handleAddCategoryClick}>
        <Button type="button" disabled={false}>
          Add New Category
        </Button>
      </div>
      <List>
        {categories?.items.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={() => handleDeleteCategory(category.id)}
          />
        ))}
      </List>
    </Box>
  );
};

export default CategoryListPage;
