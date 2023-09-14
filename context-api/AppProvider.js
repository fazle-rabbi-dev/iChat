import { useState, useEffect, useContext } from "react";
import Context from "./AppContext";
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { Users, Messages } from "@/utils/cRef";
import {
  serverTimestamp,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router"

function AppProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  
  const router = useRouter()
  
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  
  const handleSignOut = async () => {
    // alert("handleSignOut")
    await signOut(auth)
    router.push("/")
  }
  
  async function saveUser(currentuser) {
    try {
      if (currentuser?.email) {
        // Check user exists or not
        const data = await getDocs(Users);
        if (data.docs.length === 0) {
          await addDoc(Users, {
              uid: currentuser.uid,
              name: currentuser.displayName,
              email: currentuser.email,
              photo: currentuser.photoURL,
          });
          // return alert("User not exists amd users empty")
        } else {
          let docs = await data.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          });
          // Find user by email
          const isExists = docs.find(
            (doc) => doc.data.email === currentuser.email
          );
          if (isExists) {
            // console.log(docs)
            // alert("User already exists");
          } else {
            // alert("User not exists");
            await addDoc(Users, {
              uid: currentuser.uid,
              name: currentuser.displayName,
              email: currentuser.email,
              photo: currentuser.photoURL,
            });
          }
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
      saveUser(currentuser)
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const globalData = {
    loading,
    user,
    googleSignIn,
    handleSignOut
  };

  return <Context.Provider value={globalData}>{children}</Context.Provider>;
}

export default AppProvider;

function useAppProvider() {
  return useContext(Context);
}

export { useAppProvider };
