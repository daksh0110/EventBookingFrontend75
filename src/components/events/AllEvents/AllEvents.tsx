import styles from "./index.module.css";

import EventCard from '../EventCard/EventCard';
import Skeleton from 'react-loading-skeleton';
import { useFetchEventsQuery } from "../../../services/eventApi";
import { useNavigate } from 'react-router-dom';
const AllEvents = () => {
  const { data: events, error, isLoading } = useFetchEventsQuery();
  const navigate = useNavigate();
  const handleEventClick = (id: string) => {
    navigate(`/events/${id}`); // Navigate to the event page with the event's id
  };
  return (
    <>
      <h1>All Events</h1>
      
   
      {isLoading && (
        <div>
          {[...Array(4)].map((_, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <Skeleton height={200} width={300} />
              <Skeleton count={2} style={{ marginTop: '10px' }} />
            </div>
          ))}
        </div>
      )}

     
      {!isLoading && events?.data?.length > 0 && (
        <div className={styles.eventcardContainer}>
          {events?.data.map((event) => (
            <div className={styles.eventcard} key={event._id}onClick={() => handleEventClick(event._id)}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}

      {/* Optionally, handle case where no events are available */}
      {!isLoading && events?.data?.length === 0 && (
        <div>No events available</div>
      )}

{!isLoading && events?.data?.length === 0 && (
        <div>No events available</div>
      )}
    </>
  );
};

export default AllEvents;
