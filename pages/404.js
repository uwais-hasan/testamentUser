import Link from 'next/link';
import styles from '../styles/error.module.scss'
const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.description}>The page you are looking for does not exist.</p>
            <Link href="/">
                <a className={styles.link}>Go back to the home page</a>
            </Link>
        </div>
    );
};

export default NotFoundPage;