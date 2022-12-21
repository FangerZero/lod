import Link from 'next/link';
import styles from '../../styles/components/layout/Navigation.module.css';
import SignIn from './account/SignIn';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

export default function Navigation() {
    const { user, username, roles } = useContext(UserContext);
    const roleID = {
        BANNED: 0,
        LOGGED_IN: 1,
        ARTIST: 2,
        JOURNALIST: 4 
    };

    const adminFlag = (roles & roleID.JOURNALIST) === roleID.JOURNALIST;

    return (
        <div className={styles.nav}>
            <Link className={styles['nav-link']} href="/">Home</Link>
            <Link className={styles['nav-link']} href="/news">News</Link>
            <div className={styles.dropdown}>
                Game
                <div className={styles['dropdown-content']}>
                    <Link className={styles.drpdwnbtn} href="/game/characters">Characters</Link>
                    <Link className={styles.drpdwnbtn} href="/game/map">Map</Link>
                    <Link className={styles.drpdwnbtn} href="/game/timeline">Timeline</Link>
                    <Link className={styles.drpdwnbtn} href="/game/misc-facts">Miscelaneous Facts</Link>
                </div>
            </div>
            <div className={styles.dropdown}>
                Community 
                <div className={styles['dropdown-content']}>
                    <Link className={styles.drpdwnbtn} href="/community/petition">Petition</Link>
                    <Link className={styles.drpdwnbtn} href="/community/projects">Projects</Link>
                    <Link className={styles.drpdwnbtn} href="/community/fan-art">Fan Art</Link>
                    <Link className={styles.drpdwnbtn} href="/community/forum">Forum</Link>
                    <Link className={styles.drpdwnbtn} href="/community/speedruns">Speedruns</Link>
                    <Link className={styles.drpdwnbtn} href="/community/credits">Credits</Link>
                </div>
            </div>
            <div className={styles.dropdown}>
                Resources 
                <div className={styles['dropdown-content']}>
                    <Link className={styles.drpdwnbtn} href="/resources/downloads">Downloads</Link>
                    <Link className={styles.drpdwnbtn} href="/resources/guides">Guides</Link>
                    <Link className={styles.drpdwnbtn} href="https://legendofdragoon.org/wiki/index.php/Main_Page">Wiki</Link>
                    <Link className={styles.drpdwnbtn} href="/resources/damage-calculator">Damage Calculator</Link>
                    <Link className={styles.drpdwnbtn} href="/resources/contact">Contact</Link>
                    <Link className={styles.drpdwnbtn} href="/resources/archives">Archives</Link>
                </div>
            </div>
            {adminFlag &&
                <Link className={styles['nav-link']} href="/admin">Admin: {username}</Link>
            }
            <div className={styles.user}>
                <SignIn />
            </div> 
        </div>
    );
}
