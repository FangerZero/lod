import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';
import Meta from '../../../components/layout/Meta';
import characters from '../../../components/game/data/characters.json';

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
  const filePath = path.join(process.cwd(), 'components','game','data','characters.json');
  const jsonData = await fs.readFile(filePath);
  const characters = JSON.parse(jsonData);

  return {
      props: {
        characters: characters
      },
  };
}