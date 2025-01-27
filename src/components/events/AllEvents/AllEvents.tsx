import styles from "./index.module.css";
import { Suspense,lazy } from "react";

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { useFetchEventsQuery } from "../../../services/eventApi";
import { useNavigate } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { useTranslation } from 'react-i18next';

const EventCard = lazy(() => import('../EventCard/EventCard'));
const AllEvents = () => {
  const { data: events, error, isLoading } = useFetchEventsQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleEventClick = (id: string) => {
    navigate(`/events/${id}`); // Navigate to the event page with the event's id
  };
  

  return (
    <>
      <h1>{t('All-Events')}</h1>
      
   
      {isLoading && (
        <div className={styles.eventcardContainer}  >
          {[...Array(4)].map((_, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
                <SkeletonTheme baseColor="#FFFFFF" highlightColor="#FFFFFF">
    <p>
    <Skeleton height={20} width={100} style={{ marginBottom: '8px' }} />
    </p>
  </SkeletonTheme>
            </div>

          ))}
        </div>
      )}

     
       {!isLoading   && events?.data && events?.data.length > 0 && (
         <div className={styles.eventcardContainer}>
            {events?.data?.map((event) => (
            <LazyLoad key={event._id} height={200} offset={100}>
              <Suspense fallback={<Skeleton height={200} />}>
              
           
              <div
                className={styles.eventcard}
                onClick={() => handleEventClick(event._id)}
              >
                <EventCard event={event} />
              </div>
              </Suspense>
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
