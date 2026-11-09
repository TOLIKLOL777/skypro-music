import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
  });

  const [error, setError] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!formData.email.trim()) {
      setError('Заполните все поля');
      isValid = false;
    }

    if (!formData.username.trim()) {
      setError('Заполните все поля');
      isValid = false;
    }
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      Auth(formData, isLogin);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
      />
      <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
      <button className={styles.modal__btnEnter}>Войти</button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
