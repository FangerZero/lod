import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { collection, query, limit, getDocs, orderBy, where} from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function FanArt() {
  const [artList, setArtList] = useState([]);
  
  useEffect(() => {
    const getList = async () => { //Admin or Mod
      const c = query(collection(db, "fanart"), orderBy("dateTime", "desc"), limit(10));

      const cSnapshot = await getDocs(c);
      const newArray = [];
      
      cSnapshot.forEach((doc) => {
        newArray.push({id: doc.id, data: {...doc.data()}});
      });
      setArtList([...newArray]);
    }
    
    getList();
  }, []);
  
    return (
      <div>
          Fan Art
          Shows All Fan Art
      </div>
    )
  }
  