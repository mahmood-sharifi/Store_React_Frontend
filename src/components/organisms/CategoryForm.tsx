import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import CategorySelect from '../molecules/CategorySelect';
import FileUploader from '../molecules/FileUploaderSingle';

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  parentCategoryId: z.string().optional(), // Treat as a string in the form
  categoryImage: z.any().optional(), // Single image
});

export type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => void;
  initialValues?: Partial<CategoryFormData>;
  categories: { id: number; name: string }[];
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialValues, categories }) => {
  const [categoryImage, setCategoryImage] = useState<File | null>(initialValues?.categoryImage || null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues || {},
  });

  // Watching the value to check if unselect is chosen
  const selectedParentCategory = watch('parentCategoryId');

  // Populate initial values if provided
  useEffect(() => {
    if (initialValues?.categoryImage) {
      setValue('categoryImage', initialValues.categoryImage);
    }
    if (initialValues?.parentCategoryId) {
      setValue('parentCategoryId', initialValues.parentCategoryId.toString()); // Ensure string conversion
    }
  }, [initialValues, setValue]);

  // Handle file upload changes
  const handleFileChange = (file: File) => {
    setCategoryImage(file); 
    setValue('categoryImage', file); 
  };

  // Handle category selection changes
  const handleParentCategoryChange = (categoryId: string) => {
    setValue('parentCategoryId', categoryId); // Set string directly in form
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          type="text"
          register={register('name')}
          error={errors.name?.message}
        />

        {/* Use the working CategorySelect */}
        <CategorySelect
          selectedCategoryId={selectedParentCategory || ''}
          onCategoryChange={handleParentCategoryChange}
          categories={categories.map((category) => ({ id: category.id.toString(), name: category.name }))}  // Convert ID to string
          label="Parent Category"
          allowUnselect={true}  // Allow unselect
        />
        {errors.parentCategoryId && <Typography color="error">{errors.parentCategoryId.message}</Typography>}

        <FileUploader onFileChange={handleFileChange} initialFile={categoryImage} />
        {errors.categoryImage && <Typography color="error">{errors.categoryImage.message}</Typography>}

        <Button type="submit" disabled={false}>
          {initialValues ? 'Update Category' : 'Add Category'}
        </Button>
      </form>
    </Box>
  );
};

export default CategoryForm;
