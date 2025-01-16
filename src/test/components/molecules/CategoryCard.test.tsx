import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import CategoryCard from '../../../components/molecules/CategoryCard';
import { MemoryRouter } from 'react-router-dom';

const mockCategory = {
  id: '1',
  name: 'Test Category',
  parentCategoryId: null,
};

const mockOnDelete = vi.fn();

test('renders CategoryCard component', () => {
  render(
    <MemoryRouter>
      <CategoryCard category={mockCategory} onDelete={mockOnDelete} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Test Category/i)).toBeInTheDocument();
  expect(screen.getByText(/Parent Category ID: None/i)).toBeInTheDocument();
});

test('calls onDelete function when delete button is clicked', () => {
  render(
    <MemoryRouter>
      <CategoryCard category={mockCategory} onDelete={mockOnDelete} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText(/Delete/i));
  expect(mockOnDelete).toHaveBeenCalled();
});
