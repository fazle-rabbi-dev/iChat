import { useState, useEffect } from 'react'
import { useAppProvider } from "@/context-api/AppProvider";
import { useRouter } from 'next/router';
import {
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Users,  } from "@/utils/cRef";


function buddylistLogic() {
  const [searchText, setSearchText] = useState("")
  const [reservedUser, setReservedUser] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [loadingBuddy, setLoadingBuddy] = useState(true)
  
  const { loading ,user } = useAppProvider()
  const router = useRouter()
  
  const onSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filteredUsers = reservedUser.filter(({data}) => data.name.toLowerCase().startsWith(value.toLowerCase()))
    setAllUsers(filteredUsers)
  }
  
  /* Get All Users */
  async function getUsers(currentuser) {
    setLoadingBuddy(true)
    try {
      const data = await getDocs(Users)
      if(data.docs.length === 0){
        return; //alert("No users found");
      }
      let docs = await data.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      // const newDocs = docs.filter(doc => doc.data.email !== currentuser.email)
      setAllUsers(docs);
      setReservedUser(docs);
      setLoadingBuddy(false)
    } catch (err) {
      alert(`Line 33: ${err.message}`);
      console.log(err)
    }
  }
  
  useEffect(() => {
    if(!loading && !user){
      router.push('/')
    }
    
    if(!loading && user){
      getUsers()
    }
    
  },[user, loading]);
  
  return {
    loading,
    loadingBuddy,
    user,
    onSearch,
    searchText,
    allUsers
  }
}

export default buddylistLogic