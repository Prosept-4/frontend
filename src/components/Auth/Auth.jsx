function Auth() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className="auth" onSubmit={handleSubmit}>
      <h2 className="auth__title">
        Авторизация
      </h2>
      <form className="auth__form">
        <input
          className="auth__input"
          placeholder="Логин"
        />
        <input
          className="auth__input"
          placeholder="Пароль"
        />
        <button className="auth__button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Auth