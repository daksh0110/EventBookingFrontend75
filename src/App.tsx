import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Listevents from './Pages/Listevents';
import { LoginAuth } from './Pages/LoginAuth';
import RegisterAuth from './Pages/RegisterAuth';
import ErrorBoundary from './components/ErrorBoundary';
import EventDetailsPage from './Pages/EventDetailsPage';
import TicketPage from './Pages/TicketPage';



function App() {


  return (
    <>
 <Router>
  <ErrorBoundary >
  <Routes>
       

       <Route path="/" element={<Homepage />} />
               <Route path="/events" element={<Listevents />} />
               <Route path="/auth/login" element={<LoginAuth/>} />
               <Route path="/auth/register" element={<RegisterAuth />} />
               <Route path="/events/:id" element={<EventDetailsPage />} />
               <Route path="/events/tickets/:id" element={<TicketPage />} />
             </Routes>
  </ErrorBoundary>
     
    </Router>
    </>
  )
}

export default App
