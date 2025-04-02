'use client';
import Layout from '@/components/Layout';
import { Box, Button, Typography } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LateralBar from './_components/LateralBar';
import { ManagementSections } from '@/utils/interfaces/EventManagement';
import HomeSection from './_components/Sections/HomeSection';
import ActivitiesSection from './_components/Sections/Activities/ActivitiesSection';
import AttendanceListSection from './_components/Sections/AttendanceListSection';
import PromoteEventSection from './_components/Sections/PromoteEventSection';
import EditEventSection from './_components/Sections/EditEventSection';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { getEventById } from '@/services/EventService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import LinearLoading from '@/components/Loaders/LinearLoading';

const EventManagementPage = () => {
  const { id } = useParams();
  const [section, setSection] = useState(ManagementSections.Home);
  const [event, setEvent] = useState<EventDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const router = useRouter();
  useEffect(() => {
    if (id) {
      getEventById(id.toString())
        .then((event) => {
          if (event && user) {
            if (event.organizerUserId !== user.id) {
              setEvent(null);
              router.push('/not_found');
              return;
            } else {
              setEvent(event);
            }
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, user]);

  return (
    <Box display={'flex'} flexDirection={'row'} sx={{ width: '100%' }}>
      <LateralBar value={section} setValue={setSection} />
      {loading ? (
        <Layout>
          <LinearLoading text="Loading Event" />
        </Layout>
      ) : event ? (
        <>
          {section === ManagementSections.Home && <HomeSection event={event} />}
          {section === ManagementSections.Activities && (
            <ActivitiesSection id={id.toString()} />
          )}
          {section === ManagementSections.AttendanceList && (
            <AttendanceListSection />
          )}
          {section === ManagementSections.PromoteEvent && (
            <PromoteEventSection event={event} />
          )}
          {section === ManagementSections.EditEvent && (
            <EditEventSection event={event} />
          )}
        </>
      ) : (
        <Layout>
          <LinearLoading text="Please wait a moment" />
        </Layout>
      )}
    </Box>
  );
};

export default EventManagementPage;
