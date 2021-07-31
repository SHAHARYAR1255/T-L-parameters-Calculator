// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD7BjLZuckEsTa398B1UuP4Ezk4l-7NXMg",
  authDomain: "solar-bfb36.firebaseapp.com",
  databaseURL: "https://solar-bfb36.firebaseio.com",
  projectId: "solar-bfb36",
  storageBucket: "solar-bfb36.appspot.com",
  messagingSenderId: "210723711498",
  appId: "1:210723711498:web:d0919046bac107ef2dcdf3",
  measurementId: "G-EKFDZSLN7Z",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      console.log(token, "token");
      const user = result.user;
      console.log(user, "user");
    })
    .catch();
};

export const signInWithRedirect = () => {
  auth.signInWithRedirect(provider).then(() => {
    auth.getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token, "token by redirect");
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log(user, "user by redirect");
    });
  });
};

export const signOutWithGoogle = () => {
  auth
    .signOut()
    .then(() => {
      console.log("signed out");
    })
    .catch(() => {
      console.log("error");
    });
};
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};


