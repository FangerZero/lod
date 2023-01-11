import { auth, db } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { asignTheme } from '../components/util/theme';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [roles, setRoles] = useState(0);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          setUsername(docSnap.data().alias);
          setRoles(docSnap.data().roles);
          setTheme(docSnap.data().theme);
          asignTheme(docSnap.data().theme);
        } else {
          console.log("AuthHook: No such document!");
        }
      });
    } else {
        setRoles(0);
        setUsername(null);
        setTheme("default");
        asignTheme("default");
    }

    return unsubscribe;
  }, [user]);

  return { user, username, roles, theme };
}