import React from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateCategoryMutation, useGetCategoryByIdQuery, useGetAllCategoriesQuery } from '../features/categories/categoryQuery';
import CategoryForm, { CategoryFormData } from '../components/organisms/CategoryForm';

const EditCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategoryByIdQuery(Number(id));
  const { data: categories } = useGetAllCategoriesQuery({});
  const [updateCategory] = useUpdateCategoryMutation();

  const handleUpdateCategory = async (data: CategoryFormData) => {
    const { name, parentCategoryId, categoryImage } = data;

    const categoryData = new FormData();
    categoryData.append('Name', name);
    
    // Only append parentCategoryId if it's not unselected
    if (parentCategoryId && parentCategoryId !== '') {
      categoryData.append('ParentCategoryId', parentCategoryId.toString());
    }
    
    // Check if the categoryImage has been updated and is an instance of File
    if (categoryImage instanceof File) {
      categoryData.append('CategoryImage', categoryImage);
    }

    try {
      await updateCategory({ id: Number(id), categoryData }).unwrap();
      alert('Category updated successfully');
    } catch (error) {
      alert('Failed to update category');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <CategoryForm
      onSubmit={handleUpdateCategory}
      initialValues={{
        name: category.name,
        parentCategoryId: category.parentCategoryId?.toString() || '',
        categoryImage: category.categoryImage || null,
      }}
      categories={categories?.items || []}
    />
  );
};

export default EditCategoryPage;
