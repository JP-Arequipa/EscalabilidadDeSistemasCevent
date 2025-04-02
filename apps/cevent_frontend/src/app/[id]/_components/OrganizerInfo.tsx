import { UserInterface } from '@/utils/interfaces/UserInterfaces';
import { Avatar, Box, Typography } from '@mui/material';
import { styleEventOrganizer } from '@/styles/components/EventPageStyles';
interface OrganizerInfoProps {
  organizerType: 'Event Organizer' | 'Collaborator';
  user: UserInterface;
  hideEmail?: boolean;
}

const OrganizerInfo = ({
  organizerType,
  user,
  hideEmail,
}: OrganizerInfoProps) => {
  return (
    <Box sx={styleEventOrganizer.container}>
      <Box sx={styleEventOrganizer.infoUser}>
        <Avatar
          sx={styleEventOrganizer.avatar}
          src={user?.photoUrl}
          alt={user?.name}
        />
        <Box sx={styleEventOrganizer.containerName}>
          <Typography
            sx={{ ...styleEventOrganizer.grayText, minWidth: 120 }}
            variant="body"
          >
            {organizerType}
          </Typography>
          <Typography
            sx={{
              maxWidth: 120,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            fontWeight="bold"
            variant="body"
          >
            {user?.name}
          </Typography>
        </Box>
      </Box>
      {!hideEmail && (
        <Box sx={styleEventOrganizer.containerName}>
          <Typography sx={styleEventOrganizer.grayText} variant="caption">
            Email
          </Typography>
          <Typography
            sx={{
              ...styleEventOrganizer.grayText,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            variant="body"
          >
            {user.email}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OrganizerInfo;
