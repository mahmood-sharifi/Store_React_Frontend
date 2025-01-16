import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarUpload from '../../../components/atoms/AvatarUpload';

describe('AvatarUpload Component', () => {
    test('renders the label correctly', () => {
      render(<AvatarUpload label="Upload Avatar" setValue={vi.fn()} />);
      const buttonElement = screen.getByText(/upload avatar/i);
      expect(buttonElement).toBeInTheDocument();
    });
  
    test('calls setValue when a file is selected', () => {
      const mockSetValue = vi.fn();
      render(<AvatarUpload label="Upload Avatar" setValue={mockSetValue} />);
      
      const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });
  
      // Use getByLabelText to get the input field directly
      const input = screen.getByLabelText(/upload avatar/i) as HTMLInputElement;
  
      // Fire change event on the input
      fireEvent.change(input, { target: { files: [file] } });
  
      expect(mockSetValue).toHaveBeenCalledWith(file);
    });
  
    test('input[type="file"] is hidden', () => {
      render(<AvatarUpload label="Upload Avatar" setValue={vi.fn()} />);
  
      // Get the input element
      const input = screen.getByLabelText(/upload avatar/i);
  
      // Check if the input is hidden
      expect(input).not.toBeVisible();
    });
  });