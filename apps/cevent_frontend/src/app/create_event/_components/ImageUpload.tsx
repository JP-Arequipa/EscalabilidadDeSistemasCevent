import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UploadImageButton from '@/components/UploadImageButton';

interface ImageUploadProps {
  onComplete: (imageData: { coverPhotoUrl: string }) => void;
  initialImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onComplete,
  initialImage,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialImage || null,
  );

  const handleImageUpload = (fileUrl: string) => {
    setUploadedImage(fileUrl);
    onComplete({ coverPhotoUrl: fileUrl });
  };

  return (
    <Box className="image-upload" sx={{ textAlign: 'center', padding: '16px' }}>
      <Typography variant="h6">Upload Image</Typography>

      <UploadImageButton
        onComplete={handleImageUpload}
        variant="contained"
        textButton="Select Image"
      />

      <Box mt={2}>
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        ) : (
          <Typography variant="body2" color="red">
            You must upload an image to create your event.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
