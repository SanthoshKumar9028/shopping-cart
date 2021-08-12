import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.header__title}>
          <a href="/">Shopping Cart</a>
        </h1>
        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a href="/products" className={styles.nav__link}>
                products
              </a>
            </li>
            <li className={styles.nav__item}>
              <a href="/cart" className={styles.nav__link}>
                <img
                  src="/images/shopping-cart-icon.png"
                  alt="shopping cart icon"
                  className={styles.nav__icon}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
