import Link from "next/link";
import useBuddyListLogic from "@/hooks/useBuddyListLogic"
import Loading from "@/components/Loading"
import ActiveFriends from "@/components/ActiveFriends"
import ChatList from "@/components/ChatList"

function BuddyList() {
  const {
    loading,
    loadingBuddy,
    user,
    onSearch,
    searchText,
    allUsers
  } = useBuddyListLogic();
  
  if(loading || !user || loadingBuddy){
    return <Loading />
  }
  
  return (
    <section className="font_opensans">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <span className="absolute top-1 left-2">🔍</span>
        <input
          className="search_input"
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={onSearch}
        />
      </div>
      
      <h2 className="text-gray-600 text-sm text-center my-2">
        {user && `Welcome 🖐️ ${user.email}`}
      </h2>
      
      {/* Active Friends */}
      <div className="flex gap-4 overflow-auto">
        {
          allUsers?.length === 0 && <p className="text-pink-500 text-center font-bold text-sm mx-auto">No User Found</p>
        }
        {allUsers?.map((userData) => {
          return (
            <ActiveFriends userData={userData} />
          );
        })}
      </div>
      
      {/* Conversation/Chat List */}
      <div className="mt-5">
        {
          allUsers?.map(({data}) => {
            return(
              <ChatList data={data} />
            )
          })
        }
      </div>
    </section>
  );
}

export default BuddyList;
