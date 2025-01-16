import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelect from '../../../components/molecules/CategorySelect';
import { vi } from 'vitest';

const mockCategories = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
];

const mockOnCategoryChange = vi.fn();

test('renders CategorySelect component', () => {
  render(
    <CategorySelect
      selectedCategoryId=""
      onCategoryChange={mockOnCategoryChange}
      categories={mockCategories}
    />
  );

  expect(screen.getByText(/Category/i)).toBeInTheDocument();
});

test('calls onCategoryChange function when a category is selected', () => {
  render(
    <CategorySelect
      selectedCategoryId=""
      onCategoryChange={mockOnCategoryChange}
      categories={mockCategories}
    />
  );

  fireEvent.mouseDown(screen.getByLabelText(/Category/i)); // Open dropdown
  fireEvent.click(screen.getByText(/Category 1/i)); // Select category

  expect(mockOnCategoryChange).toHaveBeenCalledWith('1');
});

test('displays "Unselect" option when allowUnselect is true', () => {
  render(
    <CategorySelect
      selectedCategoryId=""
      onCategoryChange={mockOnCategoryChange}
      categories={mockCategories}
      allowUnselect={true}
    />
  );

  fireEvent.mouseDown(screen.getByLabelText(/Category/i)); // Open dropdown
  expect(screen.getByText(/Unselect/i)).toBeInTheDocument();
});
