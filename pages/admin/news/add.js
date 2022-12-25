import { useState, useContext } from 'react';
import { UserContext } from '../../../lib/context';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';
import Categories from '../../../components/admin/data/newsCategories.json';
import RichTextEditor from '../../../components/util/RichTextEditor';

/*
((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // create new doc with user.uid as it's doc name 
        const userDoc = doc(db, 'users', user.uid);
        console.log('userDoc', userDoc);
          setDoc(userDoc, { username: username, roles: 1 }, { merge: true });
      })
*/
export default function AddNewsArticle() {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(new Date);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [article, setArticle] = useState("Type your article Here");

  const onNewsSubmit = () => {
    let newsArticle = {title, dateTime, category, images, author: user.displayName, userPid: user.uid, article };

    const currentTime = new Date(Date.now());

    // CurrentTime is Before newsArticle Issue
    if(currentTime < newsArticle) {
      console.log('sleepy as F*');
    } else {
      console.log('sleepy');
    }
    // if (dateTime < new Date.now())
    console.log(newsArticle);
  }

  return (
    <RoleCheck role="JOURNALIST">
      <div>
        Title 
        <input type="text" id="title" name="title" onChange={e => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div>
        Release Date & Time (GMT-0000)
        <input type="datetime-local" id="date" name="date" onChange={e => setDateTime(e.target.valueAsDate)} placeholder="Release Date" />
      </div>
      <div> 
        Category      
        <select name="category" id="category" onChange={e => setCategory(e.target.value)} defaultValue="">
          <option value="" disabled>Select your Category</option>
          {Categories.map((element,key) => <option value={element.value} key={key}>{element.name}</option>)}
        </select>
      </div>
      <div>
        Main Image (Optional)< br/>
        <input type="file" id="images" onChange={e => setImages([...images, ...e.target.files])} accept="image/webp" multiple />
      </div>
      <RichTextEditor htmlToSave={article} setHtmlToSave={setArticle} />
      <button onClick={(e) => onNewsSubmit(e)}>Submit</button>
    </RoleCheck>
  );
}