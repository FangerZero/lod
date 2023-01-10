import Link from 'next/link';
import styles from '../../../styles/components/admin/Index.module.css';
import RoleCheck from '../../../components/RoleCheck';

import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../lib/context';
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore"; 
import { db } from '../../../lib/firebase';

export default function AddFanArt() {
  const { user, username } = useContext(UserContext);
  const [charSelect, setCharSelect] = useState([]);
  const charList = ['Dart', 'Lavitz', 'Shana', 'Rose', 'Haschel', 'Albert', 'Meru', 'Kongol', 'Miranda', 'Lloyd', 'Lenus', 'Zieg'];
  const locationList = ['N/A', 'Seles', 'Serdio Forrest', 'Serdio Prairie' ];

  const [fanart, setFanart] = useState({
    slugTitle: "",
    title: "",
    dateTime: new Date(),
    category: "",
    images: [],
    article: "",
    author: username,
    userPid: user.uid,
    ratedR: false,
    publish: false,
    date: new Date()
  });

  const checkSelect = (e) => {
    const options = e.target.options;
    const tempCharArray = new Set(charSelect);

    for(let i=0;i<options.length;i++) {
      if (options[i].selected) {
        console.log('add: ', options[i].value);
        tempCharArray.add(options[i].value);
      } else {
        console.log('delete: ', options[i].value);
        tempCharArray.delete(options[i].value);
      }
    }

    setCharSelect(Array.from(tempCharArray));
  };

  // Date Submitted
  // Filter Tags
  // Events if any, submissions are kept secret until the event submission period is over. 
  // Ability to upload a registered user's artwork for them

  return (
    <RoleCheck role="ARTIST">
      <div>
        <div>  
          Title
          <input type="text" id="title" />
        </div>
        <div>
          Image
          <input type="file" id="image" onChange={e => setFanart({...fanart, images: [...fanart.images, ...e.target.files]})} accept="image/webp" multiple />
        </div>
        <div>
          Summary
          <input type="textarea" id="summary" />
        </div>
        <div>
          Select Characters (Hold Ctrl when Selecting)
          <br />
          <select id="characters" multiple onChange={e => checkSelect(e)}>
            {charList && charList.map(char => <option value={char}>{char}</option>)}
          </select>
          <select id="characters" multiple disabled>
            {charSelect && charSelect.map(char => <option value={char}>{char}</option>)}
          </select>
        </div>
        <div>
          Location
          <select id="location">
            {locationList && locationList.map(location => <option value={location}>{location}</option>)}
          </select>
        </div>
        <div onChange={e => setFanart({...fanart, publish: e.target.value})}>
          Publish:
          <input type="radio" id="publish" name="fav_language" value="true" />Yes
          <input type="radio" id="unpublish" name="fav_language" value="false" defaultChecked/>No
        </div>
        <br />
        <br />
        <br />
        <p>
          Insert Disclaimer about giving rights to display art on the site and possibly streams that was uploaded by the original artist. But also gives Admins the discretion to remove the piece of art if it's found to be inappropriate. 
        </p>
      <ol>
        <li>uid</li>
        <li>Artist</li>
        <li>Like</li>
        <li>Dislike</li>
        <li>comments
          <ul>
            <li>Date</li>
            <li>User</li>
            <li>Comment</li>
            <li>Flag</li>
            <li>Like</li>
            <li>Dislike</li>
          </ul>
        </li>
      </ol>
      </div>
    </RoleCheck>
  );
}
