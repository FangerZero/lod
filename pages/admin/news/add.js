import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../../../lib/context';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';
import Categories from '../../../components/admin/data/newsCategories.json';
import RichTextEditor from '../../../components/util/RichTextEditor';
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 
import { db } from '../../../lib/firebase';

export default function AddNewsArticle() {
  const router = useRouter()
  const { user, username } = useContext(UserContext);

  const [newsArticle, setNewsArticle] = useState({
    slugTitle: "",
    title: "",
    dateTime: new Date(),
    category: "",
    images: [],
    article: "",
    author: username,
    userPid: user.uid
  });

  const setArticle = (article) => {
    setNewsArticle({...newsArticle, article: article});
  };

  const setTitleSlug = (title) => {
    const slugTitle = title.replace(/\s/g , "-").toLowerCase();
    setNewsArticle({...newsArticle, title: title, slugTitle: slugTitle});
  };

  const onNewsSubmit = () => {
    const newsDocId = `${newsArticle.dateTime.toString().substring(0,10)}-${newsArticle.slugTitle}`;
    const newsDoc = doc(db, 'news', newsDocId)
    
    setDoc(newsDoc, {...newsArticle}, { merge: true });
    
    console.log('newsDoc', newsDoc);
    router.push(`/admin/news/${newsDocId}`);
  }

  return (
    <RoleCheck role="JOURNALIST">
      <div>
        Title 
        <input type="text" id="title" name="title" onChange={e => setTitleSlug(e.target.value)} placeholder="Title" />
      </div>
      <div>
        Release Date & Time (GMT-0000)
        <input type="datetime-local" id="date" name="date" onChange={e => setNewsArticle({...newsArticle, dateTime: e.target.value.toString()})} placeholder="Release Date" />
      </div>
      <div> 
        Category      
        <select name="category" id="category" onChange={e => setNewsArticle({...newsArticle, category: e.target.value})} defaultValue="">
          <option value="" disabled>Select your Category</option>
          {Categories.map((element,key) => <option value={element.value} key={key}>{element.name}</option>)}
        </select>
      </div>
      <div>
        Main Image (Optional)< br/>
        <input type="file" id="images" onChange={e => setNewsArticle({...newsArticle, images: [...newsArticle.images, ...e.target.files]})} accept="image/webp" multiple />
      </div>
      <RichTextEditor htmlToSave={newsArticle.article} setHtmlToSave={setArticle}/>
      <button onClick={(e) => onNewsSubmit(e)}>Submit</button>
    </RoleCheck>
  );
}