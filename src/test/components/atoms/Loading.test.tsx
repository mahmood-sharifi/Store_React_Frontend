import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../../../components/atoms/Loading';

describe('Loading Component', () => {
  test('renders the loading spinner', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Material-UI CircularProgress has role="progressbar"
  });
});
