import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './../context/AuthContext';
import './../App.css';
import { useForm } from 'react-hook-form';

function FormLogin({ onFormSubmit }) {
  const [nombreValor, setNombreValor] = useState('');
  const [emailValor, setEmailValor] = useState('');
  const { login, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (storedUser) {
      setNombreValor(storedUser.name);
      setEmailValor(storedUser.email);
    }
  }, []);

  const handlePasswordValidation = () => {
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    clearErrors(['password', 'confirmPassword']);

    if (password && password.length < 6) {
      setError('password', {
        type: 'manual',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      });
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden.',
      });
    }
  };

  const handleNameValidation = (e) => {
    const name = e.target.value;
    setNombreValor(name);

    clearErrors('name');

    if (name.length < 3) {
      setError('name', {
        type: 'manual',
        message: 'El nombre debe tener al menos 3 caracteres.',
      });
    } else if (name.length > 20) {
      setError('name', {
        type: 'manual',
        message: 'El nombre no puede tener más de 20 caracteres.',
      });
    }
  };

  const handleEmailValidation = (e) => {
    const email = e.target.value;
    setEmailValor(email);

    clearErrors('email');

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.match(emailRegex)) {
      setError('email', {
        type: 'manual',
        message: 'Ingrese una dirección de correo electrónico válida.',
      });
    }
  };

  const handleSubmitForm = (data) => {
    const { name, email, password } = data;
    const role = email.includes('@admin') ? 'admin' : 'cliente';
    const user = { name, email, role };
    onFormSubmit(name, email);
    login(user);

    setNombreValor('');
    setEmailValor('');

    const redirectPath = location.state?.from?.pathname || '/';
    navigate(redirectPath, { replace: true });
  };

  const handleLogout = () => {
    logout();
    setNombreValor('');
    setEmailValor('');
  };

  return (
    <div className="formLoginContainer">
      <div className="loginStyle">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <label>
            Nombre:
            <input
              type="text"
              {...register('name', {
                required: 'Por favor, ingrese su nombre.',
                minLength: {
                  value: 3,
                  message: 'El nombre debe tener al menos 3 caracteres.',
                },
                maxLength: {
                  value: 20,
                  message: 'El nombre no puede tener más de 20 caracteres.',
                },
                onChange: handleNameValidation,
              })}
              value={nombreValor}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
            {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
          </label>

          <label>
            Email:
            <input
              type="email"
              {...register('email', {
                required: 'Por favor, ingrese su email.',
                onBlur: handleEmailValidation,
              })}
              value={emailValor}
              onChange={handleEmailValidation}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </label>

          <label>
            Contraseña:
            <input
              type="password"
              {...register('password', {
                required: 'Por favor, ingrese su contraseña.',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres.',
                },
                onBlur: handlePasswordValidation,
              })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </label>

          <label>
            Repetir Contraseña:
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Por favor, repita su contraseña.',
                onBlur: handlePasswordValidation,
              })}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            />
            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword.message}</span>}
          </label>
          {isValid && (
            <button
              type="submit"
              style={{ display: 'block', margin: 'auto' }}
            >
              Entrar
            </button>
          )}

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            {isAuthenticated && (
              <Link type="button" onClick={handleLogout}>Cerrar Sesión</Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;
