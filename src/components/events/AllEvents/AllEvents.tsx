import styles from "./index.module.css";

import EventCard from '../EventCard/EventCard';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useFetchEventsQuery } from "../../../services/eventApi";
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
const AllEvents = () => {
  const { data: events, error, isLoading } = useFetchEventsQuery();
  const navigate = useNavigate();
  const handleEventClick = (id: string) => {
    navigate(`/events/${id}`); // Navigate to the event page with the event's id
  };
  if(!events){
    return <div>loading...</div>
  }

  return (
    <>
      <h1>All Events</h1>
      
   
      {!isLoading && (
        <div className={styles.eventcardContainer}  >
          {[...Array(4)].map((_, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <p>
      <Skeleton count={3} width={500} />
    </p>
  </SkeletonTheme>
            </div>

          ))}
        </div>
      )}

     
       {!isLoading && events?.data.length > 0 && (
         <div className={styles.eventcardContainer}>
            {events?.data?.map((event) => (
            <LazyLoad key={event._id} height={200} offset={100}>
              <div
                className={styles.eventcard}
                onClick={() => handleEventClick(event._id)}
              >
                <EventCard event={event} />
              </div>
            </LazyLoad>
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
