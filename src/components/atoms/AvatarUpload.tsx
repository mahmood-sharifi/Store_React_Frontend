import React, { ChangeEvent } from 'react';
import { Button, Box } from '@mui/material';

interface AvatarUploadProps {
  label: string;
  setValue: (file: File) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ label, setValue }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setValue(event.target.files[0]);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" component="label" fullWidth>
        {label}
        <input type="file" hidden accept="image/*" onChange={handleFileChange} />
      </Button>
    </Box>
  );
};

export default AvatarUpload;
