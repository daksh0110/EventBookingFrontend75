import { useNavigate, useParams } from "react-router-dom";
import { useFetchEventByIdQuery } from "../../../services/eventApi";
import styles from "./index.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCreateTicketMutation } from "../../../services/ticketApi";
import { useRefreshTokenMutation } from "../../../services/authApi";
import { useTranslation } from "react-i18next";
const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [createTicket] = useCreateTicketMutation();
  const [refreshToken] = useRefreshTokenMutation();
    const { t } = useTranslation();

  if (!id) {
    return <h1>{t('message.EventNotFound')}</h1>;
  }

  const { data: eventData, error, isLoading, refetch } = useFetchEventByIdQuery(id);

  const handleBooking = async (seatNumber: string) => {
    try {
      const result = await createTicket({
        id: id,
        seatNumber: seatNumber.toString(),
      }).unwrap();
      console.log(result);
      toast.success(t('Event-Details.toastSuccess', { seatNumber }));
      if (result?.success) {
        refetch();
      }
    } catch (error: any) {
      if (error?.data?.message === "Invalid token") {
        try {
          const refreshResponse = await refreshToken().unwrap();
          localStorage.setItem("accessToken", refreshResponse.accessToken);

          const retryResult = await createTicket({
            id: id,
            seatNumber: seatNumber.toString(),
          }).unwrap();

          toast.success(t('Event-Details.toastSuccess', { seatNumber }));
          if (retryResult?.success) {
            refetch();
          }
        } catch (refreshError: any) {
          if (refreshError?.data?.message === "Refresh token expired") {
            toast.error(t('Event-Details.toastError'));
            setTimeout(() => {
              navigate("/auth/login");
            }, 2000);
          } else {
            toast.error(t('error.refreshTokenExpired'));
          }
        }
      } else {
        toast.error(t('error.else'));
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.eventDetails}>
        <Skeleton height={40} width={300} style={{ marginBottom: "20px" }} />
        <Skeleton height={20} width={500} style={{ marginBottom: "10px" }} />
        <Skeleton height={20} width={400} style={{ marginBottom: "10px" }} />
        <Skeleton height={20} width={450} style={{ marginBottom: "20px" }} />
        <Skeleton height={30} width={200} style={{ marginBottom: "10px" }} />
        <ul>
          {[...Array(5)].map((_, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <Skeleton height={20} width={300} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!eventData) {
    return <h1>{ "Event not found"}</h1>;
  }

  return (
    <div className={styles.eventDetails}>
      <h1 className={styles.eventName}>{eventData.data?.name}</h1>
      <p className={styles.eventDescription}>
        <strong>{t('Event-Details.description')}:</strong> {eventData.data.description}
      </p>
      <p className={styles.eventDate}>
        <strong>{t('Event-Details.date')}:</strong> {new Date(eventData.data.date).toLocaleString()}
      </p>
      <p className={styles.eventLocation}>
        <strong>{t('Event-Details.Location')}:</strong> {eventData.data.location}
      </p>
      <h2 className={styles.availableSeatsTitle}>{t('Event-Details.Available-Seats')}</h2>
      <ul className={styles.seatsList}>
        {eventData.data.seats.map((seat) => (
          <li
            key={seat.number}
            className={`${styles.seatItem} ${
              seat.isAvailable ? styles.available : styles.unavailable
            }`}
          >
            Seat {seat.number.toString()} - ${seat.price} -{" "}
            {seat.isAvailable ? "Available" : "Unavailable"}
            {seat.isAvailable && (
              <button
                className={styles.bookButton}
                onClick={() => handleBooking(seat.number.toString())}
              >
               {t('Event-Details.Book-Now')}
              </button>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer aria-label="Toast notifications" />
    </div>
  );
};

export default EventDetails;
