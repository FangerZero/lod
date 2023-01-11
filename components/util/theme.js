import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';

export const getThemes = ['default', 'red', 'darkness', 'jade', 'silver', 'violet', 'blue-sea', 'gold', 'divine'];

export function asignTheme(newTheme) {
    if (newTheme === "default") {
        return document.documentElement.removeAttribute('data-theme');
    }
    return document.documentElement.setAttribute('data-theme', newTheme);
}

export function updateTheme(newTheme, userInfo) {
    const docRef = doc(db, "users", userInfo.uid);
    getDoc(docRef)
    .then(results => {
        setDoc(docRef, {...results.data(), theme: newTheme}, { merge: true });
    });
}