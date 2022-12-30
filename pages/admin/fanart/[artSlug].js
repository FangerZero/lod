import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminFanArt() {
  const router = useRouter();
  const { artSlug } = router.query;

  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/fanart">Back To FanArt</Link>
      AdminFanArt
      artSlug: {artSlug}
      If artist is not current Artist, or role is not mod/admin can't display
    </RoleCheck>
  );
}
