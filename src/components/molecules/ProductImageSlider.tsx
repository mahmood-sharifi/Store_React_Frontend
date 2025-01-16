import React from 'react';
import Slider from 'react-slick';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

interface ProductImageSliderProps {
  images: {url: string}[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <CardMedia
              component="img"
              image={'https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/'+ image.url}
              alt={`Product image ${index + 1}`}
              sx={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductImageSlider;
