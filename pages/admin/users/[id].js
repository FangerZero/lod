import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

export default function AdminManageUser() {
  return (
    <RoleCheck role="ADMIN">
        AdminManageUser
        Ability to Revoke
        <br />
        Master 
        Admin
        <br />
    </RoleCheck>
  )
}
  