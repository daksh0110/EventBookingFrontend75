import React from 'react';
import { useParams } from 'react-router-dom';

const Ticket = () => {
    const { id } = useParams();
    console.log(id)
    if (!id) {
        return <h1>Ticket not found</h1>;
    }
      const decodedUrl = decodeURIComponent(id); // Decode the URL parameter
    
    
   

    return (
        <>
            <div>Ticket</div>
            {decodedUrl && ( 
                <div>
 <img 
                    src={decodedUrl} 
                    alt="Ticket QR Code" 
                    style={{ width: '200px', height: '200px' }} // Adjust size as needed
                />
                
                </div>// Check if decodedUrl exists
               
            
            )}
        </>
    );
};

export default Ticket;