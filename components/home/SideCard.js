import Image from 'next/image'
import styles from '../../styles/components/home/SideCard.module.css';

export default function SideCard(props) {

  return (
    <div className={styles.main}>
        {props.children}
    </div>
  );
}