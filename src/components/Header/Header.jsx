import logo from "../../images/prosept-logo.svg"
import {Link, NavLink, useNavigate} from "react-router-dom";

function Header({isLoggedIn, setLoggedIn}) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/auth');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="надпись просепт и зеленое дерево"/>
      {
        isLoggedIn && (
          <div className="header__nav">
            <NavLink to="/main" className={({isActive}) => `${isActive ? ' header__button header__button_active' : 'header__button'}`}>
              Разметка
            </NavLink>
            <NavLink to="/table" className={({isActive}) => `${isActive ? 'header__button header__button_active' : 'header__button'}`}>
              Просмотр
            </NavLink>
            <NavLink to="/stats" className={({isActive}) => `${isActive ? 'header__button header__button_active' : 'header__button'}`}>
              Статистика
            </NavLink>
            <Link to="/" className="header__button" onClick={handleSignOut}>
              Выйти
            </Link>
          </div>
        )
      }
    </header>
  );
}

export default Header