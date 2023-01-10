import Link from 'next/link';
import Meta from '../../components/layout/Meta';
import NewsCard from '../../components/home/NewsCard';
import styles from '../../styles/news/News.module.css';
import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy, where} from "firebase/firestore";
import { db } from '../../lib/firebase';

export default function News() {
  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    const getList = async () => {
      const d = new Date();
      const day = d.getDate()+1 > 9 ? d.getDate()+1 : `0${d.getDate()+1}`;
      const mon = d.getMonth()+1 > 9 ? d.getMonth()+1 : `0${d.getMonth()+1}`;
      const year = d.getFullYear();
      const hours = d.getHours() > 9 ? d.getHours()+1 : `0${d.getHours()+1}`; 
      const mins = d.getMinutes() > 9 ? d.getMinutes()+1 : `0${d.getMinutes()+1}`; 
      const beforeDate = `${year}-${mon}-${day} ${hours}:${mins}`;
      
      const c = query(collection(db, "news"), where("dateTime", "<", beforeDate), orderBy("dateTime", "desc"), limit(10));
      const cSnapshot = await getDocs(c);
      const newArray = [];
      
      cSnapshot.forEach((doc) => {
        newArray.push({id: doc.id, data: {...doc.data()}})
      });
      setNewsList([...newArray]);
    }
    getList()
  }, []);

  return (
    <div>
      <Meta title="News" description="Welcome to the Legend of Dragoon fansite's News Page." />
      <div className={styles.news}>
        {newsList.map(item => {
          return (
            <Link href={`/news/${item.id}`} key={item.id}>
              <NewsCard date={new Date(item.data.dateTime)} title={item.data.title} article={item.data.article}/>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
