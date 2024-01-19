import {useState} from "react";

function Auth({onSubmit}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({email, password})
  }

  return (
    <section className="auth">
      <h2 className="auth__title">
        Авторизация
      </h2>
      <form className="auth__form" name="auth" onSubmit={handleSubmit}>
        <input
          type='email'
          className="auth__input"
          placeholder="Логин"
          name='email'
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type='password'
          className="auth__input"
          placeholder="Пароль"
          name='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <p className="note">Логин: a@a.ru | Пароль: 1</p>
        <button className="auth__button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Auth