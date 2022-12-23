import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminManagerUsers() {
  return (
    <RoleCheck role="ADMIN">
      <Link className={styles.link} href="/admin/users/ALPHANUMERICID">Find User</Link>
        AdminManagerUsers
    </RoleCheck>
  )
}
  