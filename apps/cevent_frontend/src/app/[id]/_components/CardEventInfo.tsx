import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Button,
  ButtonBase,
  IconButton,
  Snackbar,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import styles from '@/styles/components/EventStyles';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { formatDate, fullFormatDate } from '@/utils/methods/stringMethods';
import TicketModal from './TicketModal';

interface CardEventInfoProps {
  eventData: EventDetailDto;
  showSnackbar?: (message: string) => void;
}

const CardEventInfo = ({ eventData, showSnackbar }: CardEventInfoProps) => {
  const handleOpenMap = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${eventData.location.latitude},${eventData.location.longitude}`,
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    if (showSnackbar) {
      showSnackbar('Link copied to clipboard');
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={styles.cardStyles}>
      <Grid display="flex" justifyContent="space-between" container spacing={1}>
        <Grid size={8}>
          <Typography variant="h5" sx={styles.titleStyles}>
            {eventData.name}
          </Typography>
          <Typography variant="body2" sx={styles.chipCategoryStyles}>
            {eventData.category.keyWord}
          </Typography>

          <Box sx={styles.infoSection}>
            <Box sx={styles.infoColumn}>
              <Box sx={styles.infoRow}>
                <EventIcon sx={styles.iconStyles} />
                <Typography variant="body2" sx={styles.labelStyles}>
                  Date and time
                </Typography>
              </Box>
              <Typography variant="body">
                {fullFormatDate(eventData.eventDate)}
              </Typography>
            </Box>
            <Box sx={styles.infoColumn}>
              <Box sx={styles.infoRow}>
                <LocationOnIcon sx={styles.iconStyles} />
                <Typography variant="body2" sx={styles.labelStyles}>
                  Address
                </Typography>
              </Box>
              <Box>
                <ButtonBase sx={styles.textClickable} onClick={handleOpenMap}>
                  <Typography variant="body1" sx={styles.linkStyles}>
                    {eventData.address}
                  </Typography>
                </ButtonBase>
              </Box>
            </Box>
            <Typography variant="body2" sx={styles.shareTextStyles}>
              Share with friends
            </Typography>
            <Box sx={styles.iconGroup}>
              <IconButton onClick={handleCopyLink}>
                <ContentCopyOutlinedIcon sx={styles.iconShareStyles} />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid size="auto" sx={styles.subscribeSection}>
          <Typography variant="h2" sx={styles.subscribeTitleStyles}>
            Subscribe now
          </Typography>
          <Box sx={styles.dataRow}>
            <Box sx={styles.infoRow}>
              <PeopleOutlineIcon sx={styles.iconStyles} />
              <Typography variant="bodyLarge" sx={styles.labelStyles}>
                Capacity
              </Typography>
            </Box>
            <Typography variant="bodyLarge">{eventData.capacity}</Typography>
          </Box>

          <Box sx={styles.dataRow}>
            <Box sx={styles.infoRow}>
              <AttachMoneyIcon sx={styles.iconStyles} />
              <Typography variant="bodyLarge" sx={styles.labelStyles}>
                Price
              </Typography>
            </Box>
            <Typography variant="bodyLarge">
              {eventData.ticketPrice} USD
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarMonthIcon />}
            sx={styles.calendarButtonStyles}
          >
            Add to Google Calendar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={styles.ticketButtonStyles}
            onClick={handleOpen}
          >
            Get my ticket
          </Button>
        </Grid>
      </Grid>

      <TicketModal
        open={open}
        onClose={handleClose}
        pricePerTicket={eventData.ticketPrice}
        capacity={eventData.capacity - eventData.attendeeCount}
        eventData={eventData}
      />
    </Card>
  );
};

export default CardEventInfo;
