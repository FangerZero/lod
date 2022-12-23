import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminEvents() {
  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/even/add">Add Events</Link>
      Add Event
    </RoleCheck>
  );
}