import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../../components/molecules/CartItem';
import { vi } from 'vitest';

const mockItem = {
  id: 1,
  quantity: 1,
  product: {
    title: 'Test Product',
    description: 'Test Description',
    price: 10,
    productImage: [{ url: 'test-image.png' }],
  },
};

const mockRefetch = vi.fn();
const mockUpdateCartItem = vi.fn();
const mockDeleteCartItem = vi.fn();

vi.mock('../../features/carts/cartQuery', () => ({
  useUpdateCartItemMutation: () => [mockUpdateCartItem],
  useDeleteCartItemMutation: () => [mockDeleteCartItem],
}));

test('renders CartItem component', () => {
  render(<CartItem item={mockItem} refetch={mockRefetch} />);
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/€10.00/i)).toBeInTheDocument();
});

test('increments item quantity', () => {
  render(<CartItem item={mockItem} refetch={mockRefetch} />);
  fireEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(mockUpdateCartItem).toHaveBeenCalledWith({
    cartItemId: mockItem.id,
    data: { quantity: mockItem.quantity + 1 },
  });
});

test('decrements item quantity', () => {
  render(<CartItem item={{ ...mockItem, quantity: 2 }} refetch={mockRefetch} />);
  fireEvent.click(screen.getByRole('button', { name: /remove/i }));
  expect(mockUpdateCartItem).toHaveBeenCalledWith({
    cartItemId: mockItem.id,
    data: { quantity: mockItem.quantity - 1 },
  });
});

test('deletes item', () => {
  render(<CartItem item={mockItem} refetch={mockRefetch} />);
  fireEvent.click(screen.getByRole('button', { name: /delete/i }));
  expect(mockDeleteCartItem).toHaveBeenCalledWith(mockItem.id);
});
