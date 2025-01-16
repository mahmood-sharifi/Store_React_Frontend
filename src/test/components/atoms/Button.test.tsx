import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  test('renders the button with correct children', () => {
    render(<Button type="button">Click Me</Button>);
    
    // Check if the button with the provided text is rendered
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the button with the correct type', () => {
    render(<Button type="submit">Submit</Button>);
    
    // Check if the button has the correct type
    const buttonElement = screen.getByText(/submit/i);
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('button is disabled when the disabled prop is true', () => {
    render(<Button type="button" disabled={true}>Disabled Button</Button>);

    // Check if the button is disabled
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
  });

  test('button is enabled by default', () => {
    render(<Button type="button">Enabled Button</Button>);

    // Check if the button is not disabled
    const buttonElement = screen.getByText(/enabled button/i);
    expect(buttonElement).not.toBeDisabled();
  });
});
