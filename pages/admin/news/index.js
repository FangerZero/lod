import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminNews() {
  return (
    <RoleCheck role="JOURNALIST">
      <Link className={styles.link} href="/admin/news/add">Add Article</Link>
        AdminNews
    </RoleCheck>
  )
}
  