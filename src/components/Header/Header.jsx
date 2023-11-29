import logo from "../../images/prosept-logo.svg"
import {Link, NavLink} from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="надпись просепт и зеленое дерево"/>
      <div className="header__nav">
        <NavLink to="/" className="header__button">
          Разметка
        </NavLink>
        <NavLink to="/table" className={({isActive}) => `${isActive ? 'header__button_active' : 'header__button'}`}>
          Просмотр
        </NavLink>
        <NavLink to="/" className="header__button">
          Статистика
        </NavLink>
        <Link to="/" className="header__button">
          Выйти
        </Link>
      </div>
    </header>
  );
}

export default Header