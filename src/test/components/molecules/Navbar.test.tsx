import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../../components/molecules/Navbar';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../app/store';

vi.mock('../../features/auth/authSlice', () => ({
  logout: vi.fn(),
}));

vi.mock('../../features/carts/cartSlice', () => ({
  openCart: vi.fn(),
  closeCart: vi.fn(),
}));

test('renders NavBar component', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/My E-Commerce/i)).toBeInTheDocument();
});
