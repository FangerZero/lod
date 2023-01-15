import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';
import roleValues from '../../../components/admin/data/roles.json';

import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../lib/context';
import { collection, query, limit, getDocs, orderBy, where} from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function AdminFanArts() {
  const { user, roles } = useContext(UserContext);
  const [artList, setArtList] = useState([]);
  
  useEffect(() => {
    const getList = async () => { //Admin or Mod
      let c = null;
      if (roles & roleValues.MODERATOR.bit || roles & roleValues.ADMIN.bit || roles & roleValues.MASTER.bit || roles & roleValues.MASTER.bit) {
        c = query(collection(db, "fanart"), orderBy("dateTime", "desc"), limit(10));
      } else if (roles & roleValues.ARTIST.bit) { // Artist only
        console.log('ruff');
        c = query(collection(db, "fanart"), where("userPid", "==", user.uid), orderBy("dateTime", "desc"), limit(10));
      }
      if (c) {
        const cSnapshot = await getDocs(c);
        const newArray = [];
        
        cSnapshot.forEach((doc) => {
          newArray.push({id: doc.id, data: {...doc.data()}});
        });
        setArtList([...newArray]);
      }
    }
    
    if (roles & roleValues.ARTIST.bit || roles & roleValues.MODERATOR.bit || roles & roleValues.ADMIN.bit || roles & roleValues.MASTER.bit) {
      getList();
    }
  }, [user, roles]);

  return (
    <RoleCheck role="ARTIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/fanart/add">Add FanArt</Link>
      {artList &&
        artList.map(item => <Link className={styles['article-link']} href={`/admin/fanart/${item.id}`} key={item.id}>{item.data.title}<br />{item.data.artist}</Link>)}
    </RoleCheck>
  );
}
