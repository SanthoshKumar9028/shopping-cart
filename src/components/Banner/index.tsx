import styles from "./Banner.module.css";

function Banner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <h2 className={styles.banner__title}>
          Online Shopping Cart Application
        </h2>
        <img
          className={styles.banner__img}
          src="/images/empty_cart.svg"
          alt="online shopping cart app"
        />
      </div>
    </section>
  );
}

export default Banner;
