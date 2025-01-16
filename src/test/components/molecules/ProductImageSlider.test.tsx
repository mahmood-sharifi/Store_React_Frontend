import { render, screen } from '@testing-library/react';
import ProductImageSlider from '../../../components/molecules/ProductImageSlider';

const mockImages = [{ url: 'image1.png' }, { url: 'image2.png' }];

test('renders ProductImageSlider component', () => {
  render(<ProductImageSlider images={mockImages} />);
  expect(screen.getByAltText(/Product image 1/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Product image 2/i)).toBeInTheDocument();
});
