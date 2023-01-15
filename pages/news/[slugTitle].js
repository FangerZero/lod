import Image from 'next/image';
import Meta from '../../components/layout/Meta';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function NewsArticle() {
  const router = useRouter();
  const { slugTitle } = router.query;
  const d = new Date();
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  const storage = getStorage();
  const [newsImage, setNewsImage] = useState('');

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
      console.log('slugTitle: ', slugTitle);
      const docRef = doc(db, "news", slugTitle);
      const data = await getDoc(docRef)
      .then(results => {
        setNewsArticle({...results.data()});
        return results.data();
      });

      if (storage && data.images[0]) {
        const imgRef= ref(storage, data.images[0]);
        
        getDownloadURL(imgRef)
        .then((url) => {
          setNewsImage(url);
        })
        .catch((error) => {
          console.log('imageDownload: ', error.code);
        });
      }
    };
    if (slugTitle) {
      fetchData();
    }
  }, [slugTitle, storage]);
  
  const displayDate = (date) => {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  };

  return (
    <>
    <Meta title={`${newsArticle.title}`} description="Welcome to the Legend of Dragoon fansite's News Page." />
    {newsImage && 
      <Image src={newsImage} alt="News Article Image" width="1000" height="200"/>
    }
    <h3>{newsArticle.title}</h3>
    {displayDate(new Date(newsArticle.dateTime))}
    <div dangerouslySetInnerHTML={{__html: newsArticle.article}} />
    </>
  );
}
