import React from 'react';
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from '../features/categories/categoryQuery';
import CategoryForm, { CategoryFormData } from '../components/organisms/CategoryForm';

const AddCategoryPage: React.FC = () => {
  const { data: categories } = useGetAllCategoriesQuery({});
  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async (data: CategoryFormData) => {
    const { name, parentCategoryId, categoryImage } = data;

    const categoryData = new FormData();
    categoryData.append('Name', name);
    if (parentCategoryId !== null) {
      categoryData.append('ParentCategoryId', parentCategoryId.toString());
    }
    if (categoryImage) {
      categoryData.append('CategoryImage', categoryImage);
    }

    try {
      await createCategory(categoryData).unwrap();
      alert('Category created successfully');
    } catch (error) {
      alert('Failed to create category');
    }
  };

  return (
    <CategoryForm
      onSubmit={handleCreateCategory}
      categories={categories?.items || []}
    />
  );
};

export default AddCategoryPage;
