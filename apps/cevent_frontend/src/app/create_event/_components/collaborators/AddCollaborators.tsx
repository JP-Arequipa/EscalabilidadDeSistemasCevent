import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  Stack,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Email as EmailIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export interface Collaborator {
  id?: string;
  email: string;
  confirmed: boolean;
}

const AddCollaborators: React.FC<{
  onAddCollaborators: (collaborators: Collaborator[]) => void;
}> = ({ onAddCollaborators }) => {
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAdd = () => {
    setEmailError('');
    if (!collaboratorEmail) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(collaboratorEmail)) {
      setEmailError('Invalid email format');
      return;
    }
    if (collaborators.some((c) => c.email === collaboratorEmail)) {
      setEmailError('This email is already added');
      return;
    }
    const newCollaborator: Collaborator = {
      email: collaboratorEmail,
      confirmed: false,
    };
    setCollaborators([...collaborators, newCollaborator]);
    setCollaboratorEmail('');
  };

  const handleRemove = (emailToRemove: string) => {
    setCollaborators(
      collaborators.filter(
        (collaborator) => collaborator.email !== emailToRemove,
      ),
    );
  };

  const handleSubmit = () => {
    if (collaborators.length > 0) {
      const confirmedCollaborators = collaborators.map((c) => ({
        ...c,
        confirmed: true,
      }));
      onAddCollaborators(confirmedCollaborators);
      setCollaborators(confirmedCollaborators);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <PersonAddIcon /> Add Event Collaborators
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          label="Collaborator Email"
          value={collaboratorEmail}
          onChange={(e) => {
            setCollaboratorEmail(e.target.value);
            setEmailError('');
          }}
          error={!!emailError}
          helperText={emailError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Add Collaborator">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleAdd}
                    disabled={!collaboratorEmail}
                  >
                    Add
                  </Button>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />

        {collaborators.length > 0 && (
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              Added Collaborators
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              <AnimatePresence>
                {collaborators.map((collaborator) => (
                  <motion.div
                    key={collaborator.email}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Chip
                      label={collaborator.email}
                      onDelete={() => handleRemove(collaborator.email)}
                      deleteIcon={<CloseIcon />}
                      color={collaborator.confirmed ? 'success' : 'primary'}
                      variant="outlined"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={collaborators.length === 0}
          sx={{ mt: 2 }}
        >
          Confirm Collaborators
        </Button>
      </Box>
    </Paper>
  );
};

export default AddCollaborators;
