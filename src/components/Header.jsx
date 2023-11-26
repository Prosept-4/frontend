import logo from "../images/prosept-logo.svg"

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="надпись просепт и зеленое дерево"/>
    </header>
  );
}

export default Header