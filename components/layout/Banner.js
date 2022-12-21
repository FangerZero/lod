import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/components/layout/Banner.module.css';
import image001 from '../../public/images/banner/70_Dragoon_Dart-Rose.webp';

export default function Banner() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image className={styles.banner} src={image001} alt="image of something" width="1000" height="200"/>
    </>
  );
}
