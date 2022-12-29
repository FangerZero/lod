import styles from '../../styles/components/admin/layout/Cards.module.css';

export default function NewsCard(props) {

  return (
    <div className={styles.main}>
      <h3>{props.date} - {props.title}</h3>
      
      {props.article &&  
        <p>
          {props.article}
        </p>
      }
    </div>
  );
}