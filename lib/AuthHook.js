import { auth, db } from '../lib/firebase';
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [roles, setRoles] = useState(0);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
          //console.log("AuthHook: Doc Exists.");
          setUsername(docSnap.data().alias);
          setRoles(docSnap.data().roles);
        } else {
          console.log("AuthHook: No such document!");
        }
      });
    } else {
        //console.log("User Not Logged in", user);
        setRoles(0);
        setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, roles };
}