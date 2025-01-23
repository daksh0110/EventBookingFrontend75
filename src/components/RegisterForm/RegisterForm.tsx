// src/pages/RegisterPage.tsx

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { useRegisterMutation } from '../../services/authApi';
import AnimatedWrapper from '../AnimatedSwitch';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const [registerUser, { isLoading, error }] = useRegisterMutation(); 
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await registerUser(data).unwrap(); // Perform registration
      console.log('Registered:', response);
      toast.success('Registration successful! Please log in to continue');
      
      const timeout = setTimeout(() => {
        navigate('/auth/login');
      }, 3000); // 3 seconds timeout
    } catch (err) {
      console.error('Registration failed:', err);
      
      // Check if the error message contains "User already exists"
      if (err?.data?.message === 'User already exists') {
        toast.error('User already exists! Please try logging in.');
      } else {
        toast.error('Registration failed! Please try again');
      }
    }
  };

  return (
    <AnimatedWrapper key="register">
    <div className={styles.logincontainer}>
      <h1>Register</h1>
      <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
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
        <button type="submit" className={styles.loginbutton}>Register</button>
      </form>
      <p className={styles.registerlink}>
        Already have an account? <Link to="/auth/login">Login</Link>
      </p>
      <ToastContainer aria-label="Toast notifications" />
    </div>
    </AnimatedWrapper>
  );
};

export default RegisterPage;
