import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminFanArts() {
  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/fanart/add">Add FanArt</Link>
      AdminFanArts
    </RoleCheck>
  );
}
