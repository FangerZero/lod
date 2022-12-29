  import Link from 'next/link';
  
  import { useState, useEffect, useRef } from 'react';
  import { useRouter } from 'next/router';
  import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
  import { db } from '../../lib/firebase';
  
  export default function NewsArticle() {
    const router = useRouter();
    const { slugTitle } = router.query;
    const d = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const articleHTML = useRef(null) 
  
    const [newsArticle, setNewsArticle] = useState({
      slugTitle: slugTitle,
      title: "",
      dateTime: new Date(),
      category: "",
      images: [],
      article: "",
    });
    
    useEffect(() => {
      const fetchData = async () => {
        const newsDoc = await doc(db, "news", slugTitle);
        await getDoc(newsDoc).then(results => {
          setNewsArticle({...results.data()});
        });
      };
      fetchData();
    }, []);
    
    const displayDate = (date) => {
      return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    };
  
    return (
      <>
      <h3>{newsArticle.title}</h3>
      {displayDate(new Date(newsArticle.dateTime))}
      <div dangerouslySetInnerHTML={{__html: newsArticle.article}} />
      </>
    );
  }
  