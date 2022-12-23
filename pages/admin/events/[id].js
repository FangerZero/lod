import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminEvent() {
  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/events">Back To Events</Link>
      Admin Event
    </RoleCheck>
  );
}
