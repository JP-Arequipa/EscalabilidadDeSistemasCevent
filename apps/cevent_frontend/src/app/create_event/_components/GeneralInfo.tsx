import React, { useEffect, useState } from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import {
  OnCompleteCallback,
  FieldsGeneralInfo,
} from '@/utils/interfaces/CreateEvent';
import { fetchCategories } from '@/services/CategoryService';
import {
  validateName,
  validateShortDescription,
  validateDescription,
} from '@/utils/Validations';
import '../_styles/GeneralInfo.css';

interface GeneralInfoProps {
  onComplete: OnCompleteCallback;
  initialData?: FieldsGeneralInfo;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  onComplete,
  initialData,
}) => {
  const [fields, setFields] = useState<FieldsGeneralInfo>(
    initialData || {
      title: '',
      shortDescription: '',
      description: '',
      categoryId: 0,
    },
  );

  const [categories, setCategories] = useState<
    { keyWord: string; phrase: string; color: string; id: number }[]
  >([]);

  const [errors, setErrors] = useState({
    title: '',
    shortDescription: '',
    description: '',
  });

  const handleFieldChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prevFields) => ({
        ...prevFields,
        [field]: e.target.value,
      }));
    };

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const categoryId = e.target.value as number;
    setFields((prevFields) => ({
      ...prevFields,
      categoryId,
    }));
  };

  const validateFields = () => {
    const newErrors: any = {};

    newErrors.title = validateName(fields.title) || '';
    newErrors.shortDescription =
      validateShortDescription(fields.shortDescription) || '';
    newErrors.description = validateDescription(fields.description) || '';

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => newErrors[key] === '');
  };

  const checkCompletion = () => {
    const isValid = validateFields();
    const { title, shortDescription, description, categoryId } = fields;
    onComplete(
      fields,
      isValid &&
        !!title &&
        !!shortDescription &&
        !!description &&
        categoryId !== 0,
    );
  };

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        const formattedCategories = fetchedCategories.map((category: any) => ({
          keyWord: category.keyWord || '',
          phrase: category.phrase || '',
          color: category.color || '',
          id: category.id || 0,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoryList();
  }, []);

  useEffect(() => {
    checkCompletion();
  }, [fields, onComplete]);

  return (
    <Box className="info-box">
      <Typography variant="h6" fontWeight="bold">
        General event information
      </Typography>

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Be clear and descriptive with a title that explains what your event is
        about.
      </FormHelperText>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={fields.title}
        onChange={handleFieldChange('title')}
        aria-label="Title"
        InputProps={{
          className: 'text-field-outline',
          style: { color: '#000000' },
        }}
        InputLabelProps={{
          style: { color: '#555555' },
        }}
        error={!!errors.title}
      />
      {errors.title && (
        <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
          {errors.title}
        </FormHelperText>
      )}

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Set a short description for your event to give a brief summary of the
        event.
      </FormHelperText>

      <TextField
        label="Short Description"
        fullWidth
        margin="normal"
        value={fields.shortDescription}
        onChange={handleFieldChange('shortDescription')}
        aria-label="Short Description"
        InputProps={{
          className: 'text-field-outline',
          style: { color: '#000000' },
        }}
        InputLabelProps={{
          style: { color: '#555555' },
        }}
        error={!!errors.shortDescription}
      />
      {errors.shortDescription && (
        <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
          {errors.shortDescription}
        </FormHelperText>
      )}

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Grab people's attention with a brief description of your event.
        Attendees will see it at the top of your event page.
      </FormHelperText>

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={fields.description}
        onChange={handleFieldChange('description')}
        aria-label="Description"
        InputProps={{
          className: 'text-field-outline',
          style: { color: '#000000' },
        }}
        InputLabelProps={{
          style: { color: '#555555' },
        }}
        error={!!errors.description}
      />
      {errors.description && (
        <FormHelperText sx={{ color: 'red', fontSize: '0.75rem' }}>
          {errors.description}
        </FormHelperText>
      )}

      <FormHelperText
        sx={{ color: 'gray', fontSize: '0.875rem' }}
        className="form-helper-text"
      >
        Correctly categorize the type of event you are organizing.
      </FormHelperText>

      <TextField
        label="Category"
        fullWidth
        margin="normal"
        select
        value={fields.categoryId}
        onChange={handleCategoryChange}
        aria-label="Category"
        InputProps={{
          className: 'text-field-outline',
          style: { color: '#000000' },
        }}
        InputLabelProps={{
          style: { color: '#555555' },
        }}
        SelectProps={{
          native: true,
        }}
      >
        <option value={0} disabled></option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.keyWord}
          </option>
        ))}
      </TextField>
    </Box>
  );
};

export default GeneralInfo;
