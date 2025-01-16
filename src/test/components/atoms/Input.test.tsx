import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  const mockRegister = { name: 'test', ref: vi.fn(), onChange: vi.fn(), onBlur: vi.fn() };

  test('renders the input with the correct label', () => {
    render(<Input label="Email" type="email" register={mockRegister} />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('displays error message if provided', () => {
    render(<Input label="Email" type="email" register={mockRegister} error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('does not display error message if not provided', () => {
    render(<Input label="Email" type="email" register={mockRegister} />);
    expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
  });
});
