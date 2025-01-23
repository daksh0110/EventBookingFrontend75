import { jwtDecode } from 'jwt-decode';

// Define the type for the decoded token
interface DecodedToken {
  userId: string;
  email: string;
  name: string;
  exp: number; // Expiry time of the token
  iat: number; // Issued at time
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // Decode the token and return the decoded payload
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};