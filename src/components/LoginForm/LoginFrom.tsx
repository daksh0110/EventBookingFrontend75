import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../RegisterForm/index.module.css";
import { useLoginMutation } from '../../services/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimatedWrapper from '../AnimatedSwitch';
import { useAppDispatch } from '../../store/store';
import { loginFailure, loginSuccess } from '../../store/reducers/authReducer';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'; 
import { useTranslation } from 'react-i18next';

const loginSchema=yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),

  });
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data).unwrap(); // Perform login
      console.log('Logged in:', response);
  
      
        dispatch(loginSuccess({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: {       
            name: response.data.user.name,
            email: response.data.user.email,
          }
          
        }));
  
     
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
       
        toast.success(t('message.toastSuccess'));

  
        // Redirect to the home page after 3 seconds
        const timeout = setTimeout(() => {
          navigate('/');
        }, 3000); // 3 seconds timeout
  
        // You can clear the timeout if needed (when the component unmounts)
        return () => clearTimeout(timeout);
      
    } catch (err) {
      console.error('Login failed:', err);
      dispatch(loginFailure(err?.data?.message || 'Invalid email or password!'));
      toast.error(t('message.toastError'));
    }
  };
  



  return (
    <AnimatedWrapper key="login">
      <div className={styles.logincontainer}>
        <h1>{t('Login')}</h1>
        <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>{t('Email')}:</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>
          <div>
            <label>{t('Password')}:</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>
          <button type="submit" className={styles.loginbutton}>Login</button>
        </form>
        <p className={styles.registerlink}>
          {t('message.Not-have-account')}
          <Link to="/auth/register" onClick={() => navigate('/auth/register')}>
          {t('Register')}
          </Link>
        </p>
        <ToastContainer aria-label="Toast notifications" />
      </div>
    </AnimatedWrapper>

  );
};

export default LoginPage;
