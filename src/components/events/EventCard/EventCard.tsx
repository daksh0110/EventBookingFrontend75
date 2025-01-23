import React from 'react';
import { Event } from '../../../store/reducers/eventReducer';
import styles from "./index.module.css";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  // Find the minimum price from the seats array
  const minPrice = Math.min(...event.seats.map((seat) => seat.price));

  return (
    <div className={styles.card}>
     
      <div className={styles.cardcontent}>
        <h3 className={styles.cardtitle}>{event.name}</h3>
        <p className={styles.carddate}>{new Date(event.date).toLocaleDateString()}</p>
        <p className={styles.cardprice}>Starting Price: RS {minPrice}</p>
      </div>
    </div>
  );
};

export default EventCard;
