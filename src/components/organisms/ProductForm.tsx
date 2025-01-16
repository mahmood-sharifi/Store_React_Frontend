import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import CategorySelect from '../molecules/CategorySelect';
import FileUploader from '../molecules/FileUploader';

const productSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Price must be a valid number" }),
  stock: z.string().regex(/^\d+$/, { message: "Stock must be a valid integer" }),
  categoryId: z.number().min(1, { message: "Category is required" }),
  productImages: z.array(z.any()).min(1, { message: "At least one image is required" }),
});

export type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  initialValues?: Partial<ProductFormData>;
  categories: { id: number; name: string }[];
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialValues, categories }) => {
  const [productImages, setProductImages] = useState<File[]>(initialValues?.productImages || []);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || {},
  });

  useEffect(() => {
    if (initialValues) {
      setValue('productImages', initialValues.productImages || []);
    }
  }, [initialValues, setValue]);

  const handleFileChange = (files: File[]) => {
    setProductImages(files);
    setValue('productImages', files);
  };

  const handleCategoryChange = (categoryId: string) => {
    setValue('categoryId', Number(categoryId));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          type="text"
          register={register('title')}
          error={errors.title?.message}
          required
        />
        <Input
          label="Description"
          type="text"
          register={register('description')}
          error={errors.description?.message}
          required
          multiline
          rows={4}
        />
        <Input
          label="Price"
          type="text"
          register={register('price')}
          error={errors.price?.message}
          required
        />
        <Input
          label="Stock"
          type="text"
          register={register('stock')}
          error={errors.stock?.message}
          required
        />
        <CategorySelect
          categories={categories}
          selectedCategoryId={initialValues?.categoryId}
          onCategoryChange={handleCategoryChange}
        />
        {errors.categoryId && <Typography color="error">{errors.categoryId.message}</Typography>}

        <FileUploader onFilesChange={handleFileChange} initialFiles={initialValues?.productImages || []} />
        {errors.productImages && <Typography color="error">{errors.productImages.message}</Typography>}

        <Button type="submit" variant="contained" fullWidth>
          {initialValues ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
