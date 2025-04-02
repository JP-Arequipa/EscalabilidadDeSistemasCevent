import { EventDetailDto, SizeBanner } from '@/utils/interfaces/EventInterfaces';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { stylesStatus } from '../../_styles/PromoteEventStyles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ModalCheckout from '@/components/Checkout/ModalCheckout';
import { updatePromoteStatusEvent } from '@/services/EventService';
import { PromoteEventDto } from '@/utils/interfaces/Promotions';
import BannerEvent from '@/components/BannerEvent';
import { PRICE_PROMOTION } from '@/utils/constans';

interface BannerPromotionProps {
  eventData: EventDetailDto;
}

const BannerPromotion = ({ eventData }: BannerPromotionProps) => {
  const [openModalCheckout, setOpenModalCheckout] = useState(false);

  const activePromotion = async (): Promise<boolean> => {
    const eventPromotion: PromoteEventDto = {
      eventId: eventData.id,
      isPromoted: true,
    };
    return updatePromoteStatusEvent(eventPromotion);
  };

  return (
    <Box display="flex" flexDirection={'column'} gap={1}>
      <Typography variant="h1">
        Promote your event with a banner on our homepage
      </Typography>
      <Typography variant="body">
        You can add priority to your event by enabling the priority option
        through a small fixed fee to be charged. The promotion has a cost of $
        {PRICE_PROMOTION}
      </Typography>
      <Typography variant="h3">Status of your banner</Typography>
      <Box sx={stylesStatus.container}>
        <Typography variant="h3">
          {eventData.isPromoted ? 'Active' : 'Inactive'}
        </Typography>
        {eventData.isPromoted ? (
          <CheckCircleIcon sx={{ color: 'green' }} />
        ) : (
          <CancelIcon sx={{ color: 'red' }} />
        )}
      </Box>
      {!eventData.isPromoted && (
        <Button variant="contained" onClick={() => setOpenModalCheckout(true)}>
          PAY FOR PROMOTION
        </Button>
      )}
      <Typography variant="body">Preview banner on the homepage:</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BannerEvent eventData={eventData} size={SizeBanner.Medium} />
      </Box>
      <ModalCheckout
        isOpen={openModalCheckout}
        onClose={() => setOpenModalCheckout(false)}
        callBackFunction={activePromotion}
        linkToRedirect={`/my_events/${eventData.id}`}
      />
    </Box>
  );
};

export default BannerPromotion;
