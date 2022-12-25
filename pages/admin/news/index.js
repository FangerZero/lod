import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminNews() {
  return (
    <RoleCheck role="JOURNALIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/news/add">Add Article</Link>
        List of News Articles
          Filter by Author, Category, Year
          Sort by Date, Author, Title, Category Default: Date Desc
    </RoleCheck>
  )
}
  