import styles from "./Honors.module.css";
import { IHonor } from "./interfaces";
import Honor from "./Honor";
import { Fragment } from "react";

const honors: IHonor[] = [
  { title: "trustable", imageUrl: "/images/trustable.png" },
  { title: "no payment", imageUrl: "/images/no-payment.png" },
  { title: "secure", imageUrl: "/images/secure.png" },
  { title: "large community", imageUrl: "/images/community.png" },
];

function Honors() {
  return (
    <section className={styles.honors}>
      <div className="container">
        {honors.map((honor) => {
          return (
            <Fragment key={honor.title}>
              <Honor honor={honor} className={styles.honor} />
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default Honors;
