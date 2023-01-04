import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Categories from '../../../components/admin/data/newsCategories.json';
import RichTextEditor from '../../../components/util/RichTextEditor';
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../../../lib/firebase';

//File Upload
import { getStorage, ref, uploadBytes, deleteObject  } from "firebase/storage";

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
    publish: false,
  });
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsDoc = await doc(db, "news", slugTitle);
      await getDoc(newsDoc).then(results => {
        setNewsArticle({...results.data()});
      });
    };
    fetchData();
  }, []);
  
  // File upload
  const storage = getStorage();

  const setImagesToNewsArticle = (e) => {
    let tempImgList = [];
    console.log('images to newsArticle: ', e);
    setImageList([...e.target.files]);
    for (const image of e.target.files) {
      console.log('image: ', image);
      tempImgList.push(`news/${slugTitle}/${image.name}`);
      // setNewsArticle({...newsArticle, images: [...newsArticle.images, `news/${slugTitle}/${image.name}`]});
    }
    setNewsArticle({...newsArticle, images: [...tempImgList]});
  };

  const getImages = () => {
    const spaceRef = ref(storage, 'images/space.jpg');

  }

  const setArticle = (article) => {
    setNewsArticle({...newsArticle, article: article});
  };

  const setTitleSlug = (title) => {
    const slugTitle = title.replace(/\s/g , "-").toLowerCase();
    setNewsArticle({...newsArticle, title: title, slugTitle: slugTitle});
  };

  const onNewsSubmit = () => {    
    const newsDocId = `${newsArticle.dateTime.toString().substring(0,10)}-${newsArticle.slugTitle}`;    
    const newsDoc = doc(db, 'news', newsDocId);
    setDoc(newsDoc, {...newsArticle}, { merge: true });

    for (const image of imageList) {
      console.log('image: ', image);
      
      
      const newImageRef = ref(storage, `news/${newsDocId}/${image.name}`);
      
      // 'file' comes from the Blob or File API
      uploadBytes(newImageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
     
      // Delete Image to change it's location
      // Problem when uploading a new image, delete the old image, but do not constantly upload new images. 
      if (slugTitle !== newsDocId) {
        const oldImageRef = ref(storage, `news/${slugTitle}/${image.name}`);
        deleteObject(oldImageRef).then(() => {
          // File deleted successfully
        }).catch((error) => {
          // Uh-oh, an error occurred!
        });
      }
    }

    // slugTitle comes from URL 
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
        <input type="file" id="images" onChange={e => setImagesToNewsArticle(e)} accept="image/webp" multiple/>
        <Image src="" />
      </div>
      <RichTextEditor htmlToSave={newsArticle.article} setHtmlToSave={setArticle}/>
      <div onChange={e => setNewsArticle({...newsArticle, publish: e.target.value})}>
        Publish:
        <input type="radio" id="publish" name="fav_language" value="true" defaultChecked={newsArticle.publish}/>Yes
        <input type="radio" id="unpublish" name="fav_language" value="false" defaultChecked={!newsArticle.publish}/>No
      </div>
      <button onClick={(e) => onNewsSubmit(e)}>Submit</button>
    </RoleCheck>
  );
}
// 
// <input type="file" id="images" onChange={e => createImageRef(e.target.files)} accept="image/webp" multiple value={[...newsArticle.images]}/>