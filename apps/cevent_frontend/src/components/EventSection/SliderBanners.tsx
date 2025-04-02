import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import MiniBannerEvent from './MiniBannerEvent';
import BannerEvent from '../BannerEvent';

interface SliderEventsProps {
  events: EventHomePageDto[];
}

const SliderBanners = ({ events }: SliderEventsProps) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box>
      {events.length > 1 ? (
        <Slider {...settings}>
          {events &&
            events.map((event) => (
              <BannerEvent
                redirectToEvent={true}
                eventData={event}
                size={'full'}
              />
            ))}
        </Slider>
      ) : (
        events[0] && <BannerEvent eventData={events[0]} size={'full'} />
      )}
    </Box>
  );
};

export default SliderBanners;
