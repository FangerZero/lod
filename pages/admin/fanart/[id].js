import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminFanArt() {
  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/news">Back To News</Link>
      AdminFanArt
    </RoleCheck>
  );
}
