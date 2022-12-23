import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AddFanArt() {
  return (
    <RoleCheck role="ARTIST">
      <Link className={styles.link} href="/admin/news">Back To News</Link>
      AddFanArt
    </RoleCheck>
  );
}
