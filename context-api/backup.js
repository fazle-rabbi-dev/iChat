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
import { serverTimestamp,addDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";

function AppProvider({ children }) {
  const [user, setUser] = useState("");
  const [senderId, setSenderId] = useState("");
  const [reservedUsers, setReservedUsers] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userExists, setUserExists] = useState(false);
  const [refresh, setRefresh] = useState(false);

  /* Create User In Db */
  async function addUser(currentuser) {
    try {
      await addDoc(Users, {
        name: currentuser.displayName,
        email: currentuser.email,
        photo: currentuser.photoURL,
      });
    } catch (err) {
      alert(err.message);
    }
  }

  /* Read All User */
  async function getUsers(currentuser) {
    try {
      const data = await getDocs(Users)
      console.log(data.docs.length)
      if(data.docs.length === 0){
        return;
      }
      let docs = await data.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      const sender = docs.filter(obj => obj.data.email === currentuser.email)
      const id = sender[0].id
      setSenderId(id)
      const newDocs = docs.filter(doc => doc.data.email !== currentuser.email)
      setAllUsers(newDocs);
    } catch (err) {
      alert(`Line 54: ${err.message}`);
      console.log(err)
    }
  }

  /* Get All Messages */
  async function getMessagesByUserId(userId) {
    try {
      const querySnapshot = await getDocs(
        query(Messages, where("senderId", "==", userId))
        // Messages
      );
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return messages;
    } catch (err) {
      alert(err.message);
      throw err;
    }
  }

  /*async function getMessages() {
    try {
      const data = await getDocs(Messages);
      const docs = data.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      console.log(docs[0])
      for (var obj of docs) {
        // console.log(obj)
        if(obj.data.senderId === 'BCH6gO0Oz024d0ByoTE2'){
          console.log("Found")
        }
      }
      setAllMessages(docs);
    } catch (err) {
      alert(err.message);
    }
  }*/

  const getMessages = async (id) => {
    console.log(id)
    
    /*getMessagesByUserId(id).then((messages) => {
      if (messages.length > 0) {
        console.log("Messages found");
        setAllMessages(messages)
      } else {
        console.log("No messages found for this user");
      }
    });*/
  };
  
  /* Send New Message */
  async function sendMessage(message, receiverId) {
    // console.log({senderId, receiverId, message})
    try {
      await addDoc(Messages, {
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        date: serverTimestamp(),
      });
    } catch (err) {
      alert(err.message);
    }
  }
  
  /* Google Sign In Handler */
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  /* First effect */
  useEffect(() => {
    /*if (!allUsers) {
      getUsers();
    }*/
    
    if (user) {
      let isExists = false;
      for (let i = 0; i < allUsers.length; i++) {
        const userObj = allUsers[i];
        if (userObj.data.email === user.email) {
          isExists = true;
          break;
        } else {
        }
      }
      if (isExists) {
        alert("Exits")
        console.log("Exits");
      } else {
        alert("Not exists")
        addUser(user);
        console.log("Not exists");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
      if(!allUsers && currentuser) {
        getUsers(currentuser);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, [allUsers]);


  /* Transfer These Data To Entire App */
  const globalData = {
    googleSignIn,
    user,
    loading,
    allUsers,
    getMessages,
    sendMessage,
    allMessages,
    setAllMessages,
    refresh,
    Messages,
    senderId
  };

  return (
    <Context.Provider value={globalData}>{children}</Context.Provider>
  );
}

export default AppProvider;

function useAppProvider(){
  return useContext(Context)
}

export { useAppProvider }