import React, { useState, useEffect, useRef } from "react";
import { useAppProvider } from "@/context-api/AppProvider";
import { useRouter } from "next/router";
import {
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Messages, Users } from "@/utils/cRef";

function chatLogic() {
  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(true)
  
  const { loading, user } = useAppProvider();
  const router = useRouter();
  const { id: receiverId } = router.query;
  const audioRef = useRef();
  const bottomRef = useRef()
  
  const handleMessageInput = (e) => {
    setMessageText(e.target.value);
  };

  const sendMessage = async (e) => {
    /* Prevent Auto Closing Keyboard */ 
    e.preventDefault()
    document.getElementById('messageInput').focus();
    try {
      if (!user?.uid || !receiverId || !messageText) {
        return alert("Invalid message info");
      }
      await addDoc(Messages, {
        senderId: user.uid,
        receiverId: receiverId,
        message: messageText,
        date: serverTimestamp(),
      });
      setMessageText("");
    } catch (err) {
      alert(err.message);
    }
  };
  
  const getReceiverByUID = async (uid) => {
    try {
      const querySnapshot = await getDocs(
        query(Users, where('uid', '==', receiverId))
      )
      const ReceiverUser = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setReceiver(ReceiverUser[0])
    } catch (error) {
      console.error('Error getting user:', error.message);
    }
  };

  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading]);

  useEffect(() => {
    if (!user || !receiverId) {
      return; //alert("Update is not ready")
    }
    
    getReceiverByUID()
    
    const q = query(
      Messages,
      where("senderId", "in", [user.uid, receiverId]),
      where("receiverId", "in", [user.uid, receiverId]),
      orderBy("date", "asc")
    );

    const unsubscribeRealTimeUpdate = onSnapshot(q, (snapshot) => {
      console.log("Real time update run");
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      
      /* Find All Messages Exchanged Between Two User */
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.senderId === user.uid &&
            message.receiverId === receiverId) ||
          (message.senderId === receiverId && message.receiverId === user.uid)
      );
      
      const newArrievedMessage = filteredMessages[filteredMessages.length-1];
      if(newArrievedMessage?.senderId !== user.uid){
        // Let's play sound!
        // audioRef?.current.currentTime = 0; // Reset the current time to start from the beginning
        audioRef?.current?.play();
        console.log("New message arrieved... ")
      }
      // newMessages = newMessages.filter(msg => msg.senderId === sender)
      setConversation(filteredMessages);
      setLoadingMessages(false)
      setTimeout(function() {
        bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    });

    return () => {
      unsubscribeRealTimeUpdate();
    };
  }, [user, receiverId]);
  
  useEffect(() => {
    if(!loadingMessages){
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[loadingMessages]);
  
  return {
    loading,
    loadingMessages,
    user,
    conversation,
    handleMessageInput,
    messageText,
    sendMessage,
    receiver,
    audioRef,
    bottomRef
  };
}

export default chatLogic;
