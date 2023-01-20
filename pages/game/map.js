import Image from 'next/image';
import Meta from '../../components/layout/Meta';
import endiness from '../../public/images/game/endiness.webp';
//import styles from '../../../styles/game/characters/character.module.css';
import styles from '../../styles/game/map.module.css';

export default function Map() {
    return (
      <div>
          <Meta title="Endiness Map" description="Explore the Endiness continent." />
          <Image className={styles.map} src={endiness} alt="map of endiness"/>
          
      </div>
    )
  }
  