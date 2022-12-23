import Link from 'next/link';
import styles from '../../styles/components/layout/Navigation.module.css';
import SignIn from './account/SignIn';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import roleValues from '../admin/data/roles.json';

export default function Navigation() {
    const { user, username, roles } = useContext(UserContext);

    const checkRole = (rolesToCheck) => {
        const arrayOfRoles = rolesToCheck.split(',');
        let test = false;
        console.log('checkROle', arrayOfRoles)
        arrayOfRoles.forEach(role => {
            if (roles & roleValues[role.toUpperCase()].bit) {
                console.log('true');
                test = true;
            }
        });
        console.log(test);
        return test;
    }

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
            {checkRole('ARTIST,MODERATOR,ADMIN,MASTER') &&
                <Link className={styles['nav-link']} href="/admin/fanart">Admin Fan-Art</Link>
            }
            {checkRole('JOURNALIST,MODERATOR,ADMIN,MASTER') &&
                <Link className={styles['nav-link']} href="/admin/news">Admin: News</Link>
            }
            {checkRole('COORDINATOR,MODERATOR,ADMIN,MASTER') &&
                <Link className={styles['nav-link']} href="/admin/events">Admin: Events</Link>
            },
            {checkRole('MODERATOR,ADMIN,MASTER') &&
                <Link className={styles['nav-link']} href="/admin/users">Admin: Users</Link>
            }
            {username &&
                <div className={styles['nav-link']}>{username}</div>
            }
            <div className={styles.user}>
                <SignIn />
            </div> 
        </div>
    );
}
