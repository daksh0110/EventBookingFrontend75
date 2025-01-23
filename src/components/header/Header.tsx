import React, { useState } from 'react';
import styles from './index.module.css';
import { useAppSelector } from '../../store/store';

const Header: React.FC = () => {
  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setTimeout(() => {
      window.location.reload(); // Refresh the page after 2 seconds
    }, 2000);
  };
  return (
    <header className={styles.header}>
      {/* Left Side: Logo or Title */}
      <div className={styles.headerleft}>
       <a href='/' className={styles.headerlink}><h1 className={styles.headertitle}>Event Booking</h1></a> 
      </div>

      {/* Right Side: Navigation Links */}
      <div className={styles.headerright}>
        <a href="/events" className={styles.headerlink}>All Events</a>
        {user && <a  className={styles.headerlink} onClick={()=>setIsDropdownOpen(!isDropdownOpen)} > {parsedUser.name}</a>}
        {!user && <a href='/auth/login' className={styles.headerlink}>Login</a>}
        {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
              </div>
            )}
      </div>
    </header>
  );
};

export default Header;
