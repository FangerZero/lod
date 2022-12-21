import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';
import Banner from '../components/layout/Banner';
import '../styles/globals.css'
import styles from '../styles/_app.module.css';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/AuthHook';

export default function App({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <UserContext.Provider value={userData}>
      <Banner />
      <Navigation />
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </UserContext.Provider>
  );
}
