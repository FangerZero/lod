import Link from 'next/link';
import {useState} from 'react';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

import { collection, query, limit, getDocs, orderBy, where} from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function AdminManagerUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);

  const search = async () => {
    let tempArray = [];
    const users = query(
      collection(db, "users"), 
      where('alias', '>=', searchTerm),
      where('alias', '<=', searchTerm + '\uf8ff'),
      orderBy("alias", "asc"), 
      limit(10));
    if (users) {
      const usersSnapshot = await getDocs(users);
      usersSnapshot.forEach((doc) => {
        tempArray.push({id: doc.id, data: {...doc.data()}});
      });
    }
    setUserList([...tempArray]);
  }

  return (
    <RoleCheck role="ADMIN">
        AdminManagerUsers
        Display user only when searched for, is Case sensitive... Prefix
        <div>
          <input type="text" name="user" onChange={e => setSearchTerm(e.target.value)} default="Alias"/>
          <button onClick={search}>Search</button>
        </div>
        <div>
          {userList && userList.map(user => <Link href={`/admin/users/${user.id}`} key={user.id}>{user.data.alias}</Link>)}
        </div>
    </RoleCheck>
  )
}

  