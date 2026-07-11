import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebase/firebase.init';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loding, setLoding] = useState(true);
  // for user Register
  const registerUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // updet profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  // for user login
  const signInUser = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // to google login
  const signInGoogle = () => {
    setLoding(true);
    return signInWithPopup(auth, googleProvider);
  };
  // to Log out

  const logOut = () => {
    setLoding(true);
    return signOut(auth);
  };
  // aita korla amder firebase user login asa na ke logo out asa amder web sit refish dela cola jaba na
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser);
      setUser(currentUser);
      setLoding(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authinfo = {
    user,
    loding,
    registerUser,
    signInUser,
    signInGoogle,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
