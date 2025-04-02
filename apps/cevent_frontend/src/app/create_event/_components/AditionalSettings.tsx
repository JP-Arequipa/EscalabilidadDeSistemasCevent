import React, { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import '../_styles/AditionalSettings.css';

const AdditionalSettings = () => {
  const [attendanceControl, setAttendanceControl] = useState(false);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAttendanceControl(checked);
  };

  return (
    <Box className="additional-settings-box">
      <Typography variant="h6" className="additional-settings-title">
        Additional Settings
      </Typography>

      <Typography variant="body1" className="additional-settings-description">
        Enable attendance control for the event
      </Typography>

      <Typography variant="body2" className="additional-settings-info">
        If you enable attendance control you will be able to register who
        entered and were present at your event.
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={attendanceControl}
            onChange={handleToggle}
            color="primary"
            inputProps={{ 'aria-label': 'Attendance Control Toggle' }}
          />
        }
        label="Enable Attendance Control"
        labelPlacement="start"
        style={{ marginLeft: 'auto' }}
      />
    </Box>
  );
};

export default AdditionalSettings;
