import React from 'react';
import { render } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminRoute from '../../../components/molecules/AdminRoute';
import { vi } from 'vitest';

// Mock the necessary modules
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  Navigate: vi.fn(() => null),
}));

describe('AdminRoute Component', () => {
  const mockChildren = <div>Admin Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('redirects to login when no profile is present', () => {
    (useSelector as vi.Mock).mockReturnValue(null);

    render(<AdminRoute>{mockChildren}</AdminRoute>);

    expect(Navigate).toHaveBeenCalledWith({ to: '/login' }, {});
  });

  test('redirects to home when profile is not an admin', () => {
    (useSelector as vi.Mock).mockReturnValue({ role: 'User' });

    render(<AdminRoute>{mockChildren}</AdminRoute>);

    expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {});
  });

  test('renders children when profile is admin', () => {
    (useSelector as vi.Mock).mockReturnValue({ role: 'Admin' });

    const { getByText } = render(<AdminRoute>{mockChildren}</AdminRoute>);

    expect(Navigate).not.toHaveBeenCalled();
    expect(getByText('Admin Content')).toBeInTheDocument();
  });
});
