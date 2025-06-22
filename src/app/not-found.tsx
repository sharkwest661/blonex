import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Səhifə tapılmadı</h2>
        <p className={styles.description}>
          Axtardığınız səhifə mövcud deyil və ya köçürülüb.
        </p>
        <Link href="/" className={styles.homeButton}>
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}
