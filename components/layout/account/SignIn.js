import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { useAuthState } from 'react-firebase-hooks/auth';
// sendPasswordResetEmail, 
import { auth, googleProvider, db } from '../../../lib/firebase';
import { useContext, useState } from 'react';
import { UserContext } from '../../../lib/context';
import styles from '../../../styles/components/layout/account/SignIn.module.css';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function Enter(props) {
  //const [user, loading, error] = useAuthState(auth);
  const { user } = useContext(UserContext);
  const [ showSignIn, setShowSignIn] = useState(false);
  const [ showCreateAccount, setShowCreateAccount] = useState(false);

  const createEmailUser = () => {
    if (password.value === password2.value) {
      const username = alias.value;

      createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // create new doc with user.uid as it's doc name 
        const userDoc = doc(db, 'users', user.uid);
        console.log('userDoc', userDoc);
          setDoc(userDoc, { username: username, roles: 1 }, { merge: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('errorCode: ', errorCode);
        // console.log('errorMessage: ', errorMessage);
      });
      loginLink();
    }
  }

  const signInWithEmail = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      loginLink();
  }

  const signInWithGoogle = () => {
    console.log('sign in w/ google');
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        const userDoc = doc(db, "users", user.uid);
        getDoc(userDoc).then(docSnap => {
          if (!docSnap.exists()) {
            const userDoc = doc(db, 'users', user.uid);
            // set alias: alias.value and set roles: 1
            setDoc(userDoc, { alias: user.displayName, roles: 1 }, { merge: true });
          }
        });
      }).catch((error) => {
        console.log('error', error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const signUserOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Signed out")
    }).catch((error) => {
      // An error happened.
      console.log('Sign Out - Error: ', error);
    });
  }

  const forgotPassword = () => {
    console.log('not working');
    // sendPasswordResetEmail(auth, email.value);
  }

  // If Signed in Show Sing Out
  if (user && Object.keys(user).length !== 0 && Object.getPrototypeOf(user) !== Object.prototype) {
    return (
      <span onClick={signUserOut}>
        Sign Out
      </span>
    );
  }

  
  const loginLink = () => {
    // Login Button
      if (showSignIn || showCreateAccount) {
        setShowSignIn(false);
        setShowCreateAccount(false);
      } else if (!showSignIn && !showCreateAccount) {
        setShowSignIn(true);
      }
  }

  const createAccountModal = () => {
    // Create Account
      if(showSignIn) {
        setShowSignIn(false);
        setShowCreateAccount(true);
      } else if (showCreateAccount) {
        setShowSignIn(true);
        setShowCreateAccount(false);
      }
  }

  // If Signed out show Sign In/Create account
  return (
    <>
      <span onClick={loginLink}>Login</span>

      {showSignIn &&
        <SignInForm signInWithEmail={signInWithEmail} forgotPassword={forgotPassword} createAccountModal={createAccountModal} signInWithGoogle={signInWithGoogle}/>
      }
      {showCreateAccount &&
        <SignUpForm createEmailUser={createEmailUser} createAccountModal={createAccountModal}/>
      }
    </>
  );

}