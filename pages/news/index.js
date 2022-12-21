import Link from 'next/link';
import Meta from '../../components/layout/Meta';
import NewsCard from '../../components/home/NewsCard';
import styles from '../../styles/news/News.module.css';

export default function News() {
  return (
    <div>
      <Meta title="News" description="Welcome to the Legend of Dragoon fansite's News Page." />
      <div className={styles.news}>
        <Link href={`/news/I'm a title`}>
          <NewsCard date="2022-03-01" title="I'm a title" summary="idk what to put here I'm erally tired so I'm a sleep soon"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
      </div>
    </div>
  )
}
