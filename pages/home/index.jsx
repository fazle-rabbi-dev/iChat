import { useState ,useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AppContext from "@/context-api/AppContext";
import Loading from "@/components/Loading"

function Home() {
  const { googleSignIn, user, loading } = useContext(AppContext);
  const [wating, setWating] = useState(true)
  const router = useRouter();
  
  const handleGoogleSignIn = async () => {
    setWating(true)
    try {
      await googleSignIn();
      router.push("/buddylist");
      setTimeout(function() {
        setWating(false)
      }, 200);
    } catch (e) {
      setWating(false)
      alert(e.message);
    }
  };
  
  useEffect(() => {
    if(!loading && user){
      router.push("/buddylist")
    }
    
    if(!user){
      setWating(false)
    }
    
  },[loading, user]);
  
  if(loading || user || wating){
    return <Loading />
  }
  
  return (
    <section className="mx-4 md:mx-10 my-2">
      <h1 className="font_opensans text-2xl bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent font-extrabold text-center tracking-wider">
        iChat Chat With Your Friends & Family With Instantly
      </h1>
      <div className="text-center mt-5">
        <button onClick={() => handleGoogleSignIn()} className="font_ptmono outline_btn">
          Sign In With Google
        </button>
        <div className="mt-2 md:mx-10">
          <img className="" src="/chat1.svg" alt="Chat Illustration" width="100%" />
        </div>
      </div>
    </section>
  );
}

export default Home;
