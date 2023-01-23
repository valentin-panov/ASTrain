import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Error404() {
  return (
    <>
      <h2 className={styles.error}>Error 404</h2>
      <p className={styles.description}>
        Please{" "}
        <Link href={`/`} className={styles.link}>
          go back
        </Link>
        to safety
      </p>
    </>
  );
}
