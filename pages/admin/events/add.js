import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AddEvent() {
  return (
    <RoleCheck role="ARTIST">
      <Link className={styles.link} href="/admin/event">Back To Events</Link>
      Add Event
    </RoleCheck>
  );
}
