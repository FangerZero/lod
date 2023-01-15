import Link from 'next/link';
import characters from './data/characters.json';
import Image from 'next/image';

export function getAllCharacters() {
    
    return (
        <>
            {characters.map(character => {
                <Link href={character.link} >
                    <Image src={character['profile-img']} alt={character.name}/>
                </Link>
            })}
        </>
    );
}
/*
export function getCharactersByName(name) {
    return characters.filter
}

// Playable, Foes, Friends, Misc
export function getCharactersByType(type) {
    
}*/
