import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../RegisterForm/index.module.css";
import { useLoginMutation } from '../../services/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedWrapper from '../AnimatedSwitch';
import { useAppDispatch } from '../../store/store';
import { loginFailure, loginSuccess } from '../../store/reducers/authReducer';
import { decodeToken } from '../../services/jwtService';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data).unwrap(); // Perform login
      console.log('Logged in:', response);
  
      // Decode the access token using the jwtService
      const decodedToken = decodeToken(response.data.accessToken);
      if (decodedToken) {
        console.log('Decoded Token:', decodedToken);
  
        // Dispatch success action with the decoded user information
        dispatch(loginSuccess({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: {
            name: decodedToken.name,
            email: decodedToken.email,
          },
        }));
  
        // Store the tokens and user info in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
          name: decodedToken.name,
          email: decodedToken.email,
        }));
  
        // Show success toast
        toast.success('Login successful!');
  
        // Redirect to the home page after 3 seconds
        const timeout = setTimeout(() => {
          navigate('/');
        }, 3000); // 3 seconds timeout
  
        // You can clear the timeout if needed (when the component unmounts)
        return () => clearTimeout(timeout);
      } else {
        throw new Error('Failed to decode token');
      }
    } catch (err) {
      console.error('Login failed:', err);
      dispatch(loginFailure(err?.data?.message || 'Invalid email or password!'));
      toast.error('Invalid email or password!');
    }
  };
  



  return (
    <AnimatedWrapper key="login">
      <div className={styles.logincontainer}>
        <h1>Login</h1>
        <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.loginbutton}>Login</button>
        </form>
        <p className={styles.registerlink}>
          Don't have an account?{' '}
          <Link to="/auth/register" onClick={() => navigate('/auth/register')}>
            Register
          </Link>
        </p>
        <ToastContainer aria-label="Toast notifications" />
      </div>
    </AnimatedWrapper>

  );
};

export default LoginPage;
