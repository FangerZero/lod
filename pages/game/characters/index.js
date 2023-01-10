import Link from 'next/link';
import Image from 'next/image';
import Meta from '../../../components/layout/Meta';
import characters from '../../../components/game/data/characters.json';

export default function Characters() {
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
  
/*

*/