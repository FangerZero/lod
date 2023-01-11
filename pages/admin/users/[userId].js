import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';
import roles from '../../../components/admin/data/roles.json';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../../lib/firebase';

export default function AdminManageUser() {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState({
    alias: "",
    roles: 65
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const userDoc = await doc(db, "users", userId);
      await getDoc(userDoc).then(results => {
        setUser({...results.data()});
      });
    };
    fetchData();
  }, []);

  const updateRole = (e) => {
    let newRoleValue = user.roles;
    console.log('Role bit value: ', e.target.value);
    if (Number(e.target.value) === 0 && !(user.roles & roles.MASTER.bit)) {
      // If Banning all other roles are errased
      newRoleValue = 0;
    } else if (user.roles & e.target.value) {
      // User currently has role and needs to remove
      newRoleValue = Number(newRoleValue) - Number(e.target.value);
    } else {
      // User currently doesn't have role and needs to add
      newRoleValue =  Number(newRoleValue) + Number(e.target.value);
    }
    console.log('newRoleValue', newRoleValue);
    const userDoc = doc(db, 'users', userId);
    setDoc(userDoc, {...user, roles: newRoleValue}, { merge: true });
  };

  const isChecked = (role) => {
    if (Number(user.roles) === 0 && role === 'BANNED') {
      return true;
    }
    return user.roles & roles[role].bit
  }

  const rolesCheckboxes = () => {
    let rolesArray = [];
    for (const role in roles) {
      if (role !== 'MASTER') {
        rolesArray.push(
        <span key={role}>
          <input type="checkbox" id={role} value={roles[role].bit} checked={isChecked(role)} onChange={e => updateRole(e)}/>
          <label for={role}>{roles[role].name}</label>
        </span>);
      }
    }
    return rolesArray;
  };

  return (
    <RoleCheck role="ADMIN">
        <h3>{user.alias}</h3>
        <br />
        {rolesCheckboxes()}
        <ul>
          <li>Banning someone will remove all other roles, including the Basic User Role.</li>
          <li>Master Roles are invisible.</li>
        </ul>
    </RoleCheck>
  )
}
  