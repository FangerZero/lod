import Link from 'next/link';
import Meta from '../../components/layout/Meta';
import NewsCard from '../../components/home/NewsCard';
import styles from '../../styles/news/News.module.css';
import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy} from "firebase/firestore";
import { db } from '../../lib/firebase';

export default function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const c = query(collection(db, "news"), orderBy("dateTime", "desc"), limit(7));
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
