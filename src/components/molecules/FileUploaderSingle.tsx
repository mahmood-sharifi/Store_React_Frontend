import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  initialFile?: File | string | null; 
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange, initialFile = null }) => {
  const [selectedFile, setSelectedFile] = useState<File | string | null>(initialFile);

  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    onFileChange(file); 
  };

  const handleDelete = () => {
    setSelectedFile(null);
    onFileChange(null); 
  };

  const renderPreview = () => {
    if (typeof selectedFile === 'string') {
      return <img src={selectedFile} alt="Selected" width={100} height={100} style={{ objectFit: 'cover' }} />;
    } else if (selectedFile instanceof File) {
      return <img src={URL.createObjectURL(selectedFile)} alt="Selected" width={100} height={100} style={{ objectFit: 'cover' }} />;
    }
    return null;
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload Category Image
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {selectedFile && (
        <Box mt={2}>
          <Typography variant="h6">Selected Image:</Typography>
          <Box position="relative" mt={1}>
            {renderPreview()} 
            <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: 0, right: 0 }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
