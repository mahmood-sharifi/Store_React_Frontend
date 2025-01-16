import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../../../components/atoms/Error';

describe('Error Component', () => {
  test('displays the correct error message for FetchBaseQueryError', () => {
    const error = { status: 404, data: { message: 'Not Found' } };
    render(<Error error={error} />);

    expect(screen.getByText(JSON.stringify(error.data))).toBeInTheDocument();
  });

  test('displays the correct error message for SerializedError', () => {
    const error = { message: 'Something went wrong' };
    render(<Error error={error} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('displays fallback message if no error message is available', () => {
    const error = {};
    render(<Error error={error} />);

    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
  });
});
