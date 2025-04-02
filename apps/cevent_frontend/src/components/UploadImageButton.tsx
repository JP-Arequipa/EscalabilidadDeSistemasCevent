import { UploadWidgetResult } from '@/utils/interfaces/UploadImage';
import { UploadButton } from '@bytescale/upload-widget-react';
import { Button, Typography } from '@mui/material';

interface UploadImageProps {
  onComplete: (fileUrl: string) => void;
  variant?: 'contained' | 'outlined' | 'text';
  textButton?: string;
}

const UploadImageButton = ({
  onComplete,
  variant,
  textButton,
}: UploadImageProps) => {
  const apiKey = process.env.NEXT_PUBLIC_IMAGE_SERVER_PUBLIC_KEY ?? '';
  const options = {
    apiKey: apiKey,
    maxFileCount: 1,
  };

  const handleOnComplete = (files: UploadWidgetResult) => {
    if (files && files.fileUrl) {
      onComplete(files.fileUrl);
    }
  };

  return apiKey === '' ? (
    <Typography> Api key not available </Typography>
  ) : (
    <UploadButton
      options={options}
      onComplete={(files) => {
        handleOnComplete(files[0]);
      }}
    >
      {({ onClick }) => (
        <Button variant={variant ? variant : 'text'} onClick={onClick}>
          {textButton ? textButton : 'Upload Image'}
        </Button>
      )}
    </UploadButton>
  );
};

export default UploadImageButton;
