import { render, screen } from '@testing-library/react';
import RedirectRoute from '../../../components/molecules/RedirectRoute';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import {store} from '../../../app/store';

vi.mock('react-router-dom', () => ({
  Navigate: () => <div>Redirected</div>,
}));

test('renders children when no token is present', () => {
  render(
    <Provider store={store}>
      <RedirectRoute>
        <div>Child Component</div>
      </RedirectRoute>
    </Provider>
  );

  expect(screen.getByText(/Child Component/i)).toBeInTheDocument();
});
