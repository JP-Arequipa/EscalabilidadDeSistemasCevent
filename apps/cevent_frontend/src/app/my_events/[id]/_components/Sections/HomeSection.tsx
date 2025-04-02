import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  ButtonBase,
  IconButton,
  Toolbar,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopy';
import QrScanner from 'react-qr-scanner';
import AttendanceModal from './AttendanceModal';
import { stylesPage } from '../../_styles/homeEventSectionStyle';
import {
  EventDetailDto,
  EventStatus,
  statusData,
  AttendanceData,
} from '@/utils/interfaces/EventInterfaces';
import { fullFormatDate } from '@/utils/methods/stringMethods';
import { updateStatusEvent } from '@/services/EventService';
import { getStatusNumber } from '@/utils/methods/eventStatusUtils';
import { fetchGetTicketByQr } from '@/services/TicketService';
import { createAttendance } from '@/services/AttendanceService';
import { UpdateStatusRegistration } from '@/utils/interfaces/Registration';
import { updateStatusRegistrationUser } from '@/services/RegistrationService';

interface SectionProps {
  event: EventDetailDto;
}

const HomeSection = ({ event }: SectionProps) => {
  const [eventStatus, setEventStatus] = useState(`${statusData[event.status]}`);
  const [displayedStatus, setDisplayedStatus] = useState(
    `Status: ${statusData[event.status]}`,
  );
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [ticketUserId, setTicketUserId] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    setDisplayedStatus(`Status: ${eventStatus}`);
  }, [eventStatus]);

  const handleStatusChange = async (e: SelectChangeEvent) => {
    setEventStatus(e.target.value);
    const statusNumber = getStatusNumber(e.target.value);
    const eventStatus: EventStatus = {
      status: statusNumber,
    };
    await updateStatusEvent(eventStatus, event.id);
  };

  const handleOpenMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`,
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard');
  };

  const handleScan = (data: { text: string } | null) => {
    if (data && data.text) {
      setQrContent(data.text);
      setIsCameraEnabled(false);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const handleEnableCamera = () => {
    setIsCameraEnabled(true);
    setQrContent(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRegisterAttendance = async (
    type: 'event' | 'activity',
    activityId?: number,
  ) => {
    try {
      if (!ticketId) {
        console.error('No ticket ID available');
        return;
      }

      if (type === 'event') {
        const updateStatus: UpdateStatusRegistration = {
          attendanceStatus: 1,
        };
        await updateStatusRegistrationUser(ticketId, updateStatus);
      } else if (type === 'activity' && activityId) {
        const attendanceData: AttendanceData = {
          userId: ticketUserId || '',
          activityId,
        };
        await createAttendance(attendanceData);
      }

      setIsModalOpen(false);
      setTicketInfo('Attendance successfully registered!');
    } catch (err) {
      setError('Failed to register attendance. Please try again.');
    }
  };

  useEffect(() => {
    const verifyQrContent = async () => {
      try {
        if (qrContent) {
          const ticket = await fetchGetTicketByQr(qrContent);
          if (ticket) {
            if (ticket.eventId === event.id) {
              setTicketUserId(ticket.userId);
              setTicketId(ticket.ticketId);
              setTicketInfo(`Ticket found for user: ${ticket.userId}`);
              setIsModalOpen(true);
            } else {
              setTicketInfo(
                'This ticket does not belong to the current event.',
              );
            }
          } else {
            setTicketInfo('No ticket found for the provided QR content.');
          }
        }
      } catch (err: any) {
        setError('An error occurred while verifying the QR content.');
        console.error(err);
      }
    };

    verifyQrContent();
  }, [qrContent, event.id]);

  return (
    <Box sx={stylesPage.container}>
      <Toolbar />
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
        <Typography color="primary" variant="display">
          Event
        </Typography>
        <Typography variant="display">Management</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={8}>
          <Card sx={stylesPage.cardStyles}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Typography variant="h5" sx={stylesPage.titleStyles}>
                  {event.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={stylesPage.chipCategoryStyles}>
                    {event.category.keyWord}
                  </Box>
                  <Chip
                    sx={stylesPage.ongoingStatusChip}
                    label={displayedStatus}
                  />
                </Box>
                <Box
                  mt={2}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <EventIcon sx={stylesPage.iconStyles} />
                      <Typography variant="body2" sx={stylesPage.labelStyles}>
                        Date and Time
                      </Typography>
                    </Box>
                    <Typography>{fullFormatDate(event.eventDate)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <LocationOnIcon sx={stylesPage.iconStyles} />
                      <Typography variant="body2" sx={stylesPage.labelStyles}>
                        Address
                      </Typography>
                    </Box>
                    <ButtonBase
                      onClick={handleOpenMap}
                      sx={{
                        textAlign: 'left',
                        padding: 0,
                        marginLeft: '-4px',
                        width: 'fit-content',
                        display: 'inline-flex',
                      }}
                    >
                      <Typography variant="body1" sx={stylesPage.linkStyles}>
                        {event.address}
                      </Typography>
                    </ButtonBase>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={stylesPage.infoRow}>
                      <Typography variant="body2">
                        Share with friends
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={handleCopyLink}
                      sx={stylesPage.iconStyles}
                    >
                      <ContentCopyOutlinedIcon sx={stylesPage.iconStyles} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid
                size={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  component="img"
                  src={event.coverPhotoUrl}
                  alt="Event cover"
                  sx={{ width: '100%', height: 'auto', borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          </Card>

          <Box mt={3}>
            <Card
              sx={{
                padding: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Event Status</Typography>
              <Select
                value={eventStatus}
                onChange={handleStatusChange}
                sx={{ width: '150px' }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Postponed">Postponed</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="On Hold">On Hold</MenuItem>
              </Select>
            </Card>
          </Box>

          <Box mt={3}>
            <Typography variant="h6">Ticket Information</Typography>
            <Grid container spacing={2} mt={1}>
              <Grid size={6}>
                <Card sx={stylesPage.ticketCard}>
                  <Typography>Tickets Sold</Typography>
                  <Typography>{event.attendeeCount}</Typography>
                </Card>
              </Grid>
              <Grid size={6}>
                <Card sx={stylesPage.ticketCard}>
                  <Typography>Total Revenue</Typography>
                  <Typography>{event.attendeeCount}</Typography>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid size={4}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: 3,
            }}
          >
            <Typography variant="h6">Validate Tickets</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={
                isCameraEnabled
                  ? () => setIsCameraEnabled(false)
                  : handleEnableCamera
              }
            >
              {isCameraEnabled ? 'Apagar Cámara' : 'Escanear Ticket'}
            </Button>

            <Box
              mt={2}
              sx={{
                width: '100%',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                border: '1px dashed #ccc',
              }}
            >
              {isCameraEnabled ? (
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  La cámara está apagada
                </Typography>
              )}
            </Box>

            {ticketInfo && <Alert severity="info">{ticketInfo}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
          </Card>
        </Grid>
      </Grid>
      <AttendanceModal
        open={isModalOpen}
        onClose={handleModalClose}
        onRegisterAttendance={handleRegisterAttendance}
        userId={ticketUserId || ''}
        activities={event.activities}
      />
    </Box>
  );
};

export default HomeSection;
