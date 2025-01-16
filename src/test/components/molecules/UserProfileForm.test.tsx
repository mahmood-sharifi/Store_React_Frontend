import { render, screen, fireEvent } from '@testing-library/react';
import UserProfileForm from '../../../components/molecules/UserProfileForm';

const mockProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

test('renders UserProfileForm component', () => {
  render(<UserProfileForm profile={mockProfile} />);
  expect(screen.getByDisplayValue(/John/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/Doe/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/john.doe@example.com/i)).toBeInTheDocument();
});

test('updates profile input fields', () => {
  render(<UserProfileForm profile={mockProfile} />);
  fireEvent.change(screen.getByLabelText(/First Name/i), {
    target: { value: 'Jane' },
  });
  expect(screen.getByDisplayValue(/Jane/i)).toBeInTheDocument();
});
