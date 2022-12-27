import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';
import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy} from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function AdminNews() {
    
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const c = query(collection(db, "news"), orderBy("dateTime", "desc"), limit(10));
      const cSnapshot = await getDocs(c);
      const newArray = [];
      
      console.log(`Fetched ${cSnapshot.size} documents`);
      cSnapshot.forEach((doc) => {
        newArray.push({id: doc.id, data: {...doc.data()}})
      });
      setNewsList([...newArray]);
    }
    getList()
  }, []);

  return (
    <RoleCheck role="JOURNALIST,MODERATOR,ADMIN">
      <Link className={styles.link} href="/admin/news/add">Add Article</Link>
      {newsList.map(item => <Link className={styles['article-link']} href={`/admin/news/${item.id}`} key={item.id}>{item.data.title}</Link>)}
    </RoleCheck>
  )
}
  