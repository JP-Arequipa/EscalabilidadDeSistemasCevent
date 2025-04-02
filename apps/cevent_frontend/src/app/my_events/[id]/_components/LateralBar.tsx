import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Icon,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CampaignIcon from '@mui/icons-material/Campaign';
import CreateIcon from '@mui/icons-material/Create';
import { stylesBar } from '../_styles/lateralBarStyle';
import { ManagementSections } from '@/utils/interfaces/EventManagement';

interface LateralBarProps {
  value: ManagementSections;
  setValue: (value: ManagementSections) => void;
}

const LateralBar = ({ value, setValue }: LateralBarProps) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: ManagementSections,
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={stylesBar.container}>
      <BottomNavigation
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        onChange={handleChange}
        value={value}
      >
        <BottomNavigationAction
          value={ManagementSections.Home}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          value={ManagementSections.Activities}
          label="Activities"
          icon={<ChecklistIcon />}
        />
        <BottomNavigationAction
          value={ManagementSections.AttendanceList}
          label="People"
          icon={<PeopleAltIcon />}
        />
        <BottomNavigationAction
          value={ManagementSections.PromoteEvent}
          label="Campaign"
          icon={<CampaignIcon />}
        />
        <BottomNavigationAction
          value={ManagementSections.EditEvent}
          label="Edit"
          icon={<CreateIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default LateralBar;
