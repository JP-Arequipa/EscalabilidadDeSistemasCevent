import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { Ticket } from '@/utils/interfaces/TIcketsInterfaces';
import { Modal, Box, Typography, Chip } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

interface TicketModalProps {
  ticketData: Ticket;
  eventData: EventDetailDto;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const TicketModal = ({
  ticketData,
  eventData,
  openModal,
  setOpenModal,
}: TicketModalProps) => {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <QRCodeSVG value={ticketData.qrContent} size={400} />
        <Typography variant="h1" fontWeight="bold">
          {eventData.name}
        </Typography>
        <Chip
          label={ticketData.isUsed ? 'Used' : 'Not used'}
          color={ticketData.isUsed ? 'error' : 'success'}
          variant="outlined"
        />
      </Box>
    </Modal>
  );
};

export default TicketModal;
