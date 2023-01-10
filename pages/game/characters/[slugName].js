import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Meta from '../../../components/layout/Meta';
import characters from '../../../components/game/data/characters.json';

export default function Character() {
  const router = useRouter();
  const { slugName } = router.query;
  const [character, setCharacter] = useState(characters.find(character => character.link === slugName));  
    
  return (
    <div>
      {character && 
        <div>
          <Meta title={`${character.name}`} description={`Welcome to the Legend of Dragoon fansite's Character page for ${character.name}.`} />
          {character.name}
          <br />
          {character.age} years old
        </div>
      }
    </div>
  )
}

/*

      
*/
  