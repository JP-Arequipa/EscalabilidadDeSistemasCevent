import React, { useState } from 'react';
import { Box, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const statusColors: Record<string, string> = {
  Pending: '#1E3A8A',
  Cancelled: '#FCA5A5',
  Postponed: '#F97316',
  'In Progress': '#FACC15',
  Completed: '#16A34A',
  'On Hold': '#7C3AED',
};

interface StatusDropdownProps {
  currentStatus: string;
  onChange: (newStatus: string) => void;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onChange,
}) => {
  const [status, setStatus] = useState<string>(currentStatus);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    onChange(newStatus);
  };

  return (
    <Box
      sx={{
        display: 'inline-block',
        borderRadius: 1,
        backgroundColor: statusColors[status] || statusColors.Pending,
        padding: '0',
      }}
    >
      <Select
        value={status}
        onChange={handleChange}
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          border: 'none',
          backgroundColor: 'transparent',
          '.MuiSelect-icon': { color: '#fff' },
        }}
        disableUnderline
      >
        {Object.keys(statusColors).map((statusKey) => (
          <MenuItem key={statusKey} value={statusKey}>
            {statusKey}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default StatusDropdown;
