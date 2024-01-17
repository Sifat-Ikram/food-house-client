import auth from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const register = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log(user.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const logOut = async () => {
  return await signOut(auth)
    .then((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const signInWithGoogle = async () => {
  const provider = new auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

let currentUser = null;

const authState = (callback) => {
  const unSubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser = user;
    } else {
      console.log("User is signed out");
      currentUser = null;
    }
    await callback(user);
  });

  return () => {
    unSubscribe();
  };
};

export { register, signIn, logOut, signInWithGoogle, authState, currentUser };
