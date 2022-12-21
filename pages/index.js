import Meta from '../components/layout/Meta';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import NewsCard from '../components/home/NewsCard';
import SideCard from '../components/home/SideCard';


export default function Home() {
  return (
    <>
      <Meta description="A fansite to unify the fandom worldwide." />
      <div className={styles.news}>
        <Link href={`/news/I'm a title`}>
          <NewsCard date="2022-03-01" title="I'm a title" summary="idk what to put here I'm erally tired so I'm a sleep soon"/>
        </Link>
        <Link href={`/news/Meows`}>
          <NewsCard date="2022-03-01" title="Meows" summary="Test"/>
        </Link>
      </div>
      <div className={styles['side-cards']}>
        <SideCard info="Podcast/Youtube">
          <iframe width="100%" src="https://www.youtube.com/embed/bA92Cl6NfzQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </SideCard>
        <SideCard>
          Events Calendar
        </SideCard>
        <SideCard>
          Campaign Widget
        </SideCard>
      </div>
    </>
  )
}