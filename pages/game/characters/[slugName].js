import fs from 'fs/promises';
import path from 'path';
import Meta from '../../../components/layout/Meta';

export default function Character(props) {
  const { characterDetails } = props;
    
  return (
    <div>
      <Meta title={`${characterDetails.name}`} description={`Welcome to the Legend of Dragoon fansite's Character page for ${characterDetails.name}.`} />
      {characterDetails.name}
      <br />
      {characterDetails.age} years old
    </div>
  )
}

async function getCharacters() {
  const filePath = path.join(process.cwd(), 'components','game','data','characters.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data
} 

export async function getStaticProps(context) {
  const { params } = context;
  const slugName = params.slugName;
  const characters = await getCharacters();
  const character = characters.find(character => character.link === slugName);

  if (!character) {
    return { notFound: true };
  }

  return {
      props: {
        characterDetails: character
      },
  };
}

export async function getStaticPaths() {
  const characters = await getCharacters();
  const pathsWithParams = characters.map(character => ({params: {slugName: character.link}}));

  return {
    paths: pathsWithParams,
    fallback: 'blocking'
  };
}