import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { registerRegistration } from '@/services/RegistrationService';
import { validateTicket } from '@/services/TicketService';
import {
  validateTicketRedeemForm,
  ValidationErrors,
} from '@/utils/validators/RedeemValidators';
import { EventDetailDto } from '@/utils/interfaces/EventInterfaces';
import { TicketValidatedDto } from '@/utils/interfaces/TicketInterfaces';
import eventDetailsHtml from '@/utils/EmailBody';
import { NotificationScheduleRequestDto } from '@/utils/interfaces/NotificationInterfaces';
import { scheduleEmail } from '@/services/NotificationService';
import { RegistrationInputDto } from '@/utils/interfaces/Registration';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fullFormatDate } from '@/utils/methods/stringMethods';

export const useTicketRedemption = (
  ticketId: string,
  event: EventDetailDto | null,
  ticket: TicketValidatedDto | null,
) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [formData, setFormData] = useState<RegistrationInputDto>({
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    ticketId: ticketId,
    eventId: event?.id || -1,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  function validateAllEmpty(): boolean {
    return (
      formData.name === '' &&
      formData.lastName === '' &&
      formData.phoneNumber === '' &&
      formData.email === ''
    );
  }

  useEffect(() => {
    if ((session?.user || user) && validateAllEmpty()) {
      setFormData((prev) => ({
        ...prev,
        name: session?.user?.name || user?.name || '',
        email: session?.user?.email || user?.email || '',
        phoneNumber: user?.phoneNumber || prev.phoneNumber,
        lastName: user?.lastName || prev.lastName,
      }));
    }
  }, [user]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    const { isValid, errors } = validateTicketRedeemForm(formData);

    if (!isValid) {
      setErrors(errors);
      return false;
    }

    setIsSubmitting(true);
    try {
      if (ticket) {
        await validateTicket(ticket.qrContent);
        formData.ticketId = ticket.ticketId;
      }
      if (event) {
        formData.eventId = event.id;
        const now = new Date();

        now.setMinutes(now.getMinutes() + 1);
        now.setHours(now.getHours() + 4);

        const date = now.toISOString().split('T')[0];
        const hour = now.toTimeString().split(' ')[0];
        if (ticket) {
          const eventHtml = eventDetailsHtml
            .replace(/{event}/g, event.name)
            .replace(/{venue}/g, event.venue)
            .replace(/{date}/g, fullFormatDate(event.eventDate))
            .replace(/{location}/g, event.address)
            .replace(/{eventImage}/g, event.coverPhotoUrl)
            .replace(/{qrCode}/g, `data:image/png;base64,${ticket.qrContent}`);
          const notificationBody: NotificationScheduleRequestDto = {
            emails: [formData.email],
            notificationBody: eventHtml,
            date: date,
            hour: hour,
          };
          await registerRegistration(formData);
          await scheduleEmail(notificationBody);

          setAlert({
            open: true,
            message: 'Ticket redeemed successfully!',
            severity: 'success',
          });

          setTimeout(() => router.push('/'), 3000);
        }
        return true;
      }
    } catch (error) {
      console.error('Ticket redemption failed', error);
      setAlert({
        open: true,
        message: 'Ticket redemption failed. Please try again.',
        severity: 'error',
      });
      setIsSubmitting(false);
      return false;
    }
  }, [formData, ticket, router]);

  const handleAlertClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    setFormData,
    alert,
    handleAlertClose,
  };
};
