import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

import { useState } from 'react';
import { useRouter } from 'next/router';
// import Categories from '../../../components/admin/data/newsCategories.json';
// import RichTextEditor from '../../../components/util/RichTextEditor';
// import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 
// import { db } from '../../../lib/firebase';

export default function AdminNewsArticle() {
  const router = useRouter();
  const { slugTitle } = router.query;

  console.log('router: ', router);
  const [newsArticle, setNewsArticle] = useState({
    slugTitle: slugTitle,
    title: "",
    dateTime: new Date(),
    category: "",
    images: [],
    article: "",
    author: "",
    userPid: ""
  });

  const setArticle = (article) => {
    setNewsArticle({...newsArticle, article: article});
  };

  const onNewsSubmit = () => {
    // Should be able to save via news.uid received
  }

  return (
    <RoleCheck role="JOURNALIST,MODERATOR,ADMIN">
      Cats go Meow
    </RoleCheck>
  );
}

/*

      <div>
        Title 
        <input type="text" id="title" name="title" onChange={e => setNewsArticle({...newsArticle, title: e.target.value})} placeholder="Title" />
      </div>
      <div>
        Release Date & Time (GMT-0000)
        <input type="datetime-local" id="date" name="date" onChange={e => setNewsArticle({...newsArticle, dateTime: e.target.valueAsDate})} placeholder="Release Date" />
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
*/