import Link from 'next/link';
import Image from 'next/image';
import Meta from '../../../components/layout/Meta';

import { collection, query, limit, getDocs, where, orderBy, startAt} from "firebase/firestore";
import { db } from '../../../lib/firebase';

export default function Characters(props) {
  const { characters } = props;

  return (
    <>
      <Meta title={`Characters`} description="Welcome to the Legend of Dragoon fansite's Characters list page." />
        {characters.map(character => {
            return(
              <Link key={character.link} href={`characters/${character.link}`} >
                <Image src={character['profile-img']} alt={character.name} width="100" height="100"/>
              </Link>
            );
        })}
    </>
  );
}

export async function getStaticProps() {
  console.log('meow');
  
  let queryIndex = 0;
  let queryCount = 0;
  const queryLimit = 25;
  const characters = [];  

  do {
    // Query Database 
    let charQuery = query(collection(db, "characters"), orderBy("name"), startAt(queryIndex), limit(queryLimit));
    const charDocs = await getDocs(charQuery);

    console.log('length: ', charDocs.docs.length);
    queryCount = charDocs.docs.length;
    queryIndex+= queryLimit;

    charDocs.forEach((doc) => {
      const data = doc.data();
      characters.push({ link: data.link, name: data.name, "profile-img": data['profile-img']});
    });
  } while (queryCount === queryLimit);
  
  return {
      props: {
        characters: characters
      },
  };
}

