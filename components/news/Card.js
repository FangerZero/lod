import Image from 'next/image'
import styles from '../../styles/components/home/NewsCard.module.css';

export default function NewsCard(props) {

  return (
    <div className={styles.main}>
      <h3>{props.date} - {props.title}</h3>
      
      {props.image &&
        <Image src={props.image} alt="Image of News"></Image>
      }
      {props.summary &&  
        <p>
          {props.summary}
        </p>
      }
    </div>
  );
}