import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { GetCategoryDto } from '../../features/categories/categoryTypes';

interface CategoryCardProps {
  category: GetCategoryDto;
  onDelete: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{category.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Parent Category ID: {category.parentCategoryId || 'None'}
        </Typography>
      </CardContent>
      <Box display="flex" alignItems="center" p={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/category/${category.id}/edit`}
          sx={{ mr: 2 }}
        >
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default CategoryCard;
