import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../components/molecules/ProductCard';
import { vi } from 'vitest';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 10,
  productImage: [{ url: 'test-image.png' }],
};

const mockDeleteProduct = vi.fn();
const mockCreateCartItem = vi.fn();

vi.mock('../../features/products/productsQuery', () => ({
  useDeleteProductMutation: () => [mockDeleteProduct],
}));

vi.mock('../../features/carts/cartQuery', () => ({
  useCreateCartItemMutation: () => [mockCreateCartItem],
}));

test('renders ProductCard component', () => {
  render(<ProductCard product={mockProduct} role="User" />);
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
});

test('adds product to cart', () => {
  render(<ProductCard product={mockProduct} role="User" />);
  fireEvent.click(screen.getByText(/Add to Cart/i));
  expect(mockCreateCartItem).toHaveBeenCalled();
});
