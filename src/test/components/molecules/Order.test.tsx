import { render, screen } from '@testing-library/react';
import OrderCard from '../../../components/molecules/Order';
import { vi } from 'vitest';

const mockOrder = {
  orderDate: new Date().toISOString(),
  orderItems: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ],
};

vi.mock('../../features/products/productsQuery', () => ({
  useGetProductByIdQuery: (id) => ({
    data: { id, title: `Product ${id}`, price: id * 10 },
  }),
}));

test('renders OrderCard component', () => {
  render(<OrderCard order={mockOrder} />);
  expect(screen.getByText(/Order Date/i)).toBeInTheDocument();
});
