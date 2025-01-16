import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); 
    onFilesChange([...selectedFiles, ...files]);
  };

  const handleDelete = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload Product Images
        <input type="file" multiple hidden onChange={handleFileChange} />
      </Button>

      {/* Display selected images */}
      {selectedFiles.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Selected Images:</Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {selectedFiles.map((file, index) => (
              <Box key={index} position="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
                <IconButton
                  onClick={() => handleDelete(index)}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
