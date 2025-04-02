import {
  EventDetailDto,
  EventHomePageDto,
  SizeBanner,
  sizeBannerObj,
} from '@/utils/interfaces/EventInterfaces';
import { fullFormatDate } from '@/utils/methods/stringMethods';
import { Box, Button, Typography } from '@mui/material';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { stylesBanner } from '@/styles/components/BannerEventStyle';
import { useRouter } from 'next/navigation';

interface BannerEventProps {
  eventData: EventDetailDto | EventHomePageDto;
  size: SizeBanner | 'full';
  redirectToEvent?: boolean;
}

const BannerEvent = ({
  eventData,
  size,
  redirectToEvent,
}: BannerEventProps) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/${eventData.id}`);
  };
  return (
    <Box
      sx={{
        ...stylesBanner.bannerEvent,
        backgroundImage: `url(${eventData.coverPhotoUrl})`,
        width: size === 'full' ? '100%' : sizeBannerObj[size].width,
        height: size === 'full' ? '80vh' : sizeBannerObj[size].height,
      }}
    >
      <Box sx={stylesBanner.containerInfo}>
        <Typography sx={stylesBanner.textBanner} variant="display">
          {eventData.name}
        </Typography>
        <Typography sx={stylesBanner.textBanner} fontWeight={200} variant="h3">
          {fullFormatDate(eventData.eventDate).replace('at', ' | ')}
        </Typography>
        <Typography sx={stylesBanner.textBanner} fontWeight={200} variant="h3">
          {eventData.address}
        </Typography>
        <Button
          sx={stylesBanner.buttonBanner}
          startIcon={<ConfirmationNumberOutlinedIcon />}
          variant="contained"
          onClick={handleRedirect}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default BannerEvent;
