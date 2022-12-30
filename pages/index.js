import Meta from '../components/layout/Meta';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import NewsCard from '../components/home/NewsCard';
import SideCard from '../components/home/SideCard';
import { useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy} from "firebase/firestore";
import { db } from '../lib/firebase';


export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [ytVideo, setYTVideo] = useState('');

  useEffect(() => {
    const getList = async () => {
      const c = query(collection(db, "news"), orderBy("dateTime", "desc"), limit(10));
      const cSnapshot = await getDocs(c);
      const newArray = [];
      
      cSnapshot.forEach((doc) => {
        newArray.push({id: doc.id, data: {...doc.data()}})
      });
      setNewsList([...newArray]);
    }
    getList();
    latestYTVideo();
  }, []);

  const latestYTVideo = () => {
    fetch("https://decapi.me/youtube/latest_video?id=UC7LuPZPTRxCjr3uHG0qCiXg").then(response => response.text().then(text => {
      const videoId = text.split("/").pop();
      setYTVideo(`https://www.youtube.com/embed/${videoId}`);
    }));
  };

  return (
    <>
      <Meta description="A fansite to unify the fandom worldwide." />
      <div className={styles.news}>
        {newsList.map(item => {
          return (
            <Link href={`/news/${item.id}`} key={item.id}>
              <NewsCard date={new Date(item.data.dateTime)} title={item.data.title} article={item.data.article}/>
            </Link>
          )
        })}
      </div>
     
      <div className={styles['side-cards']}>
        <SideCard info="Youtube">
          {ytVideo !== '' &&
          <>
            Coming Up...
            <iframe width="100%" src={ytVideo} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </>}
        </SideCard>
        <SideCard info="Podcast">
          Podcasts
        </SideCard>
        <SideCard>
          Events Calendar
        </SideCard>
        <SideCard>
          Campaign Widget
        </SideCard>
      </div>
    </>
  )
}