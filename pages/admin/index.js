import Link from 'next/link';
import styles from '../../styles/components/admin/Index.module.css';

export default function Admin() {
    return (
      <div className={styles.links}>
        <Link className={styles.link} href="/admin/news">News</Link>
        <Link className={styles.link} href="/admin/news/add">News: Add</Link>
        <Link className={styles.link} href="/admin/fanart">Fan Art</Link>
        <Link className={styles.link} href="/admin/fanart/add">Fan Art: Add</Link>
        <Link className={styles.link} href="/admin/events">Events</Link>
        <Link className={styles.link} href="/admin/events/add">Events: Add</Link>
        <Link className={styles.link} href="/admin/users">Events</Link>
      </div>
    )
  }
  