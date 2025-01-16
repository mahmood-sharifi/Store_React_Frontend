import React from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductByIdQuery } from '../features/products/productsQuery';
import { useGetAllCategoriesQuery } from '../features/categories/categoryQuery';
import ProductForm, { ProductFormData } from '../components/organisms/ProductForm';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(Number(id));
  const { data: categories } = useGetAllCategoriesQuery({});
  const [updateProduct] = useUpdateProductMutation();

  const handleUpdateProduct = async (data: ProductFormData) => {
    const { title, description, price, stock, categoryId, productImages } = data;
  
    const productData = new FormData();
    productData.append('Title', title);
    productData.append('Description', description);
    productData.append('Price', price);
    productData.append('Stock', stock);
    productData.append('CategoryId', categoryId.toString());
    productImages.forEach((image) => productData.append('ProductImage', image));
  
    try {
      await updateProduct({ id: Number(id), productData }).unwrap();  // Pass both id and productData
      alert('Product updated successfully');
    } catch (error) {
      alert('Failed to update product');
    }
  };

  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductForm
      onSubmit={handleUpdateProduct}
      initialValues={{
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        categoryId: product.categoryId,
        productImages: product.productImage || [],
      }}
      categories={categories?.items || []}
    />
  );
};

export default EditProductPage;
