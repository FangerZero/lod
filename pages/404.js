import Meta from '../components/layout/Meta';
import Image from 'next/image';
import styles from '../styles/404.module.css';

export default function Custom404() {
  const src = '/images/ruff-404.png';
  
  return (
    <div className={styles.main}>
      <Meta title="404" description="Welcome to the Legend of Dragoon fansite's 404 Page." />
      <h1>404 - Page Not Found</h1>

      <Image
        src={src}
        alt="Ruff doesn't know it."
        width={500}
        height={500}
      />
      <p>
        404? Ruff doesn’t know it, ruff.
        <br />
        Ruff thought there were only 108 fruits…
      </p>
      <p>
        Either way, the page you’re looking for has vanished, ruff. It’s rough, ruff.
      </p>
      <p>
        If you’re feeling lucky, you can enter some search terms below, ruff..
      </p>
    </div>
  );    
}