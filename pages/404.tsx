import Link from "next/link";
import styles from "../styles/error.module.scss";
import { MainLayout } from "../layouts";

export default function Error404() {
  return (
    <MainLayout>
      <h2>Error 404</h2>
      <p className={styles.description}>
        Please{" "}
        <Link href={`/`} className={styles.link}>
          go back
        </Link>
        to safety
      </p>
    </MainLayout>
  );
}
