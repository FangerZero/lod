import fs from 'fs/promises';
import path from 'path';
import Meta from '../../../components/layout/Meta';
import styles from '../../../styles/game/characters/character.module.css';
import Image from 'next/image';
import React, { useState } from "react";

export default function Character(props) {
  const { characterDetails } = props;
  const [additionView, setAdditionView] = useState({});

  const hideShowAddition = (additionKey) => {
    console.log('hide/show: ', additionKey);/*
    if(!additionView[`${additionKey}-levels`]) {
      console.log('meow');
      return setAdditionView({...additionView, [`${additionKey}-levels`]: true })
    }
    setAdditionView({...additionView, [`${additionKey}-levels`]: !additionView[`${additionKey}-levels`] });*/
  };
    
  return (
    <div>
      <Meta title={`${characterDetails.name}`} description={`Welcome to the Legend of Dragoon fansite's Character page for ${characterDetails.name}.`} />
      <div>
        <div className={styles['left']}>
          leftSide
        </div>
        <div className={styles['right']}>
          <h1>{characterDetails.name}</h1>
          <br />
          {characterDetails.age && `Age: ${characterDetails.age}`}
          <br />
          {characterDetails['height-cm'] && characterDetails['height-ft'] && `Height: ${characterDetails['height-cm']} cm / ${characterDetails['height-ft']}`}
          <br />
          {characterDetails.species && `Species: ${characterDetails.species}`}
          <br />
          {characterDetails.element && `Element: ${characterDetails.element}`}
          <p>
          {characterDetails.description && characterDetails.description}
          </p>
        </div>
      </div>
      {characterDetails.additions &&
        <div>
          <h2>Additions</h2>
          {characterDetails.additions.map((addition,additionKey) => {
            return (
              <div key={`${addition.name.replace(/\s/g, '')}-${additionKey}`}>
                <div onClick={hideShowAddition}>{addition.name && addition.name}</div>
                <div id={`${addition.name.replace(/\s/g, '')}-${additionKey}-levels`}>
                  {addition.info && addition.info}
                  <div>
                    <div className={styles['left-addition']}>
                      {addition.gif && <Image src={addition.gif} alt={`${addition.name} Addition`} width={360} height={270} />}
                    </div>
                    <div className={styles['right-addition']}>
                      <table>
                        <thead>
                          <tr>
                            <th>Level</th>
                            <th>Completions</th>
                            <th>Damage</th>
                            <th>SP</th>
                          </tr>
                        </thead>
                        {addition.levels && 
                          <tbody>
                            {addition.levels.map((level,levelKey) => {
                              return (
                                <tr key={`${addition.name.replace(/\s/g, '')}-${additionKey}-${levelKey}`}>
                                  <td>{level.level && level.level}</td>
                                  <td>{level.completions && level.completions}</td>
                                  <td>{level.damage && level.damage}</td>
                                  <td>{level.sp && level.sp}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        }
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  )
}

// Everything Below is for going to production 
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