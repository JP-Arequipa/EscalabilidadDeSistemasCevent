import { Ticket } from '@/utils/interfaces/TIcketsInterfaces';
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { QRCodeSVG } from 'qrcode.react';
import { CURRENCY_PROMOTION, DOMAIN } from '@/utils/constans';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import { useRouter } from 'next/navigation';
import { capitalizeFirstLetter } from '@/utils/methods/stringMethods';
import { useState } from 'react';
import TicketModal from './TicketModal';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
interface InfoTicketProps {
  ticketData: Ticket;
  eventData: EventDetailDto;
  ticketNumber: number;
  ticketPrice: number;
  setOpenSnackbar: (value: boolean) => void;
  setSnackbarMessage: (value: string) => void;
}

const InfoTicket = ({
  ticketData,
  eventData,
  ticketNumber,
  ticketPrice,
  setOpenSnackbar,
  setSnackbarMessage,
}: InfoTicketProps) => {
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${DOMAIN}/redeem/${ticketData.ticketId}`);
    setOpenSnackbar(true);
    setSnackbarMessage('Link copied to clipboard');
  };
  const router = useRouter();
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        padding: 2,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
          }}
        >
          <ConfirmationNumberOutlinedIcon
            sx={{ width: 50, height: 50, color: 'primary.main' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption">No.{ticketNumber}</Typography>
            <Box display={'flex'} flexDirection={'row'} gap={2}>
              <Typography variant="bodyLarge">
                {ticketPrice} {capitalizeFirstLetter(CURRENCY_PROMOTION)}
              </Typography>
              <Chip
                label={ticketData.isUsed ? 'Used' : 'Not used'}
                color={ticketData.isUsed ? 'error' : 'success'}
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 12 }}
            onClick={handleCopyLink}
            startIcon={
              <ContentCopyOutlinedIcon sx={{ color: 'primary.main' }} />
            }
          >
            Copy reedem link
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 12 }}
            startIcon={<RedeemOutlinedIcon sx={{ color: 'white' }} />}
            onClick={() => router.push(`/redeem_ticket/${ticketData.ticketId}`)}
          >
            Redeem
          </Button>
        </Box>
      </Box>
      <Box>
        <ButtonBase onClick={() => setOpenTicketModal(true)}>
          <QRCodeSVG value={ticketData.qrContent} size={100} />
        </ButtonBase>
      </Box>
      <TicketModal
        ticketData={ticketData}
        openModal={openTicketModal}
        setOpenModal={setOpenTicketModal}
        eventData={eventData}
      />
    </Paper>
  );
};

export default InfoTicket;
