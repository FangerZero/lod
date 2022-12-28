import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Categories from '../../../components/admin/data/newsCategories.json';
import RichTextEditor from '../../../components/util/RichTextEditor';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../../lib/firebase';

export default function AdminNewsArticle() {
  const router = useRouter();
  const { slugTitle } = router.query;
  const d = new Date();

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
        console.log(results.data());
        setNewsArticle({...results.data()});
      });
    };
    fetchData();
  }, []);
  
  const setArticle = (article) => {
    setNewsArticle({...newsArticle, article: article});
  };

  const setTitleSlug = (title) => {
    console.log('SlugTitle', title);
    const slugTitle = title.replace(/\s/g , "-").toLowerCase();
    setNewsArticle({...newsArticle, title: title, slugTitle: slugTitle});
  };

  const onNewsSubmit = () => {
    const newsDocId = `${newsArticle.dateTime.toString().substring(0,10)}-${newsArticle.slugTitle}`;    
    const newsDoc = doc(db, 'news', newsDocId);
    setDoc(newsDoc, {...newsArticle}, { merge: true });
    
    if (slugTitle !== newsDocId) {
      // Grabs Old Slug Title Doc and deletes it.
      deleteDoc(doc(db, "news", slugTitle));
      router.push(`/admin/news/${newsDocId}`);
    } else {
      router.push(`/admin/news`);
    }
  }

  return (
    <RoleCheck role="JOURNALIST,MODERATOR,ADMIN">
      <div>
        Title 
        <input type="text" id="title" name="title" onChange={e => setTitleSlug(e.target.value)} placeholder="Title" value={newsArticle.title}/>
      </div>
      <div>
        Release Date & Time (GMT-0000)
        <input type="datetime-local" id="date" name="date" onChange={e => setNewsArticle({...newsArticle, dateTime: e.target.value.toString()})} placeholder="Release Date" value={newsArticle.dateTime} />
      </div>
      <div> 
        Category      
        <select name="category" id="category" onChange={e => setNewsArticle({...newsArticle, category: e.target.value})} value={newsArticle.category}>
          <option value="" disabled>Select your Category</option>
          {Categories.map((element,key) => <option value={element.value} key={key}>{element.name}</option>)}
        </select>
      </div>
      <div>
        Main Image (Optional)< br/>
        <input type="file" id="images" onChange={e => setNewsArticle({...newsArticle, images: [...newsArticle.images, ...e.target.files]})} accept="image/webp" multiple value={[...newsArticle.images]}/>
      </div>
      <RichTextEditor htmlToSave={newsArticle.article} setHtmlToSave={setArticle}/>
      <button onClick={(e) => onNewsSubmit(e)}>Submit</button>
    </RoleCheck>
  );
}
