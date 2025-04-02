import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import MiniBannerEvent from './MiniBannerEvent';

interface SliderEventsProps {
  events: EventHomePageDto[];
}

const SliderEvents = ({ events }: SliderEventsProps) => {
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
    <Box sx={{ marginBottom: '40px' }}>
      {events.length > 1 ? (
        <Slider {...settings}>
          {events &&
            events.map((event) => (
              <MiniBannerEvent key={event.id} event={event} />
            ))}
        </Slider>
      ) : (
        events[0] && <MiniBannerEvent event={events[0]} />
      )}
    </Box>
  );
};

export default SliderEvents;
