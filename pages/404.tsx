import styles from "../styles/error.module.scss";
import { MainLayout } from "../layouts";
import GradientLink from "../components/common/buttons/GradientLink";

export default function Error404() {
  return (
    <MainLayout>
      <h2 className={styles.title}>404: nothing interesting here.</h2>
      <p className={styles.description}>
        <GradientLink to={`/`} text={"Go back to safety"} />
      </p>
    </MainLayout>
  );
}
