import { render, screen } from '@testing-library/react';
import UserCard from '../../../components/molecules/UserCard';

const mockUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

test('renders UserCard component', () => {
  render(<UserCard user={mockUser} />);
  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
});
