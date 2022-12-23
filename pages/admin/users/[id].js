import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminManageUser() {
  return (
    <RoleCheck role="ADMIN">
      <Link className={styles.link} href="/admin/users">Back To Users</Link>
        AdminManageUser
    </RoleCheck>
  )
}
  