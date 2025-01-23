import { useParams } from "react-router-dom";
import { useFetchEventByIdQuery } from "../../../services/eventApi";
import styles from "./index.module.css";
import { toast ,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decodeToken } from "../../../services/jwtService";
import { useCreateTicketMutation } from "../../../services/ticketApi";
const EventDetails = () => {
    const { id } = useParams();
    const [createTicket] = useCreateTicketMutation();
    if (!id) {
        return <h1>Event not found</h1>;
    }

    const { data: eventData, error, isLoading } = useFetchEventByIdQuery(id);
    
    if (!eventData) {
        return isLoading ? <h1>Loading...</h1> : <h1>{error}</h1>;
    }
    console.log(eventData);
   
   
    
    const handleBooking = async (seatNumber: string) => {
        const token = localStorage.getItem('accessToken'); // Assuming you store the token in localStorage
        const decoded = token ? decodeToken(token) : null;
        
        if (!decoded || !decoded.email) {
            alert("User  email not found. Please log in.");
            return;
        }
    
        try {
          
            const result = await createTicket({ id: id,seatNumber: seatNumber.toString(), email: decoded.email }).unwrap();
            
            // Notify the user of the successful booking
            toast.success(`Successfully booked seat number `);
            setTimeout(() => {
                window.location.reload(); 
            }, 2000); 
        } catch (error) {
            console.error("Error booking seat:", error);
            toast.error("Error booking seat. Please try again.");
        }
    
        console.log(`Booking seat with number ${seatNumber}`);
    };
    return (
        <div className={styles.eventDetails}>
            <h1 className={styles.eventName}>{eventData.data.name}</h1>
            <p className={styles.eventDescription}><strong>Description:</strong> {eventData.data.description}</p>
            <p className={styles.eventDate}><strong>Date:</strong> {new Date(eventData.data.date).toLocaleString()}</p>
            <p className={styles.eventLocation}><strong>Location:</strong> {eventData.data.location}</p>
            <h2 className={styles.availableSeatsTitle}>Available Seats</h2>
            <ul className={styles.seatsList}>
                {eventData.data.seats.map(seat => (
                    <li key={seat._id} className={`${styles.seatItem} ${seat.isAvailable ? styles.available : styles.unavailable}`}>
                        Seat {seat.number.toString()} - ${seat.price} - {seat.isAvailable ? 'Available' : 'Unavailable'}
                        {seat.isAvailable && <button className={styles.bookButton} onClick={()=>handleBooking(seat.number)}>Book</button>}
                    
                    </li>
                ))}
            </ul>
            <ToastContainer aria-label="Toast notifications" />
        </div>
    );
}

export default EventDetails;