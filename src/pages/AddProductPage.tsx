import React from 'react';
import { useCreateProductMutation } from '../features/products/productsQuery';
import { useGetAllCategoriesQuery } from '../features/categories/categoryQuery';
import ProductForm from '../components/organisms/ProductForm';
import { ProductFormData } from '../components/organisms/ProductForm';

const AddProductPage: React.FC = () => {
  const { data: categories } = useGetAllCategoriesQuery({});
  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (data: ProductFormData) => {
    const { title, description, price, stock, categoryId, productImages } = data;
    
    const productData = new FormData();
    productData.append('Title', title);
    productData.append('Description', description);
    productData.append('Price', price);
    productData.append('Stock', stock);
    productData.append('CategoryId', categoryId.toString());
    productImages.forEach((image) => productData.append('ProductImage', image));

    try {
      await createProduct(productData).unwrap();
      alert('Product created successfully');
    } catch (error) {
      alert('Failed to create product');
    }
  };

  return (
    <ProductForm
      onSubmit={handleCreateProduct}
      categories={categories?.items || []}
    />
  );
};

export default AddProductPage;
