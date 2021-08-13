import { Link } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.header__title}>
          <Link to="/">Shopping Cart</Link>
        </h1>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <Link to="/products" className={styles.nav__link}>
                products
              </Link>
            </li>
            <li className={styles.nav__item}>
              <Link to="/cart" className={styles.nav__link}>
                <img
                  src="/images/shopping-cart-icon.png"
                  alt="shopping cart icon"
                  className={styles.nav__icon}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
