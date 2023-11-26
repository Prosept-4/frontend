import logo from "../../images/prosept-logo.svg"
import {Link, NavLink} from "react-router-dom";

function Header() {
  // const navigate = useNavigate();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="надпись просепт и зеленое дерево"/>
      <div className="header__nav">
        <NavLink to="" className="header__button">
          Разметка
        </NavLink>
        <NavLink to="" className="header__button">
          Просмотр
        </NavLink>
        <NavLink to="" className="header__button">
          Статистика
        </NavLink>
      </div>
      <Link to="" className="header__button">
        Выйти
      </Link>
    </header>
  );
}

export default Header