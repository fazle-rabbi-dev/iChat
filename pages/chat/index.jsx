import useChatLogic from "@/hooks/useChatLogic";
import Loading from "@/components/Loading"
import Message from "@/components/Message"
import { BiSolidSend } from "react-icons/bi"

function ChatUi() {
  const {
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
  } = useChatLogic();
  
  if(loadingMessages){
    return <Loading />
  }
  
  return (
    <section className="font_opensans relative h-[100vh]">
      <audio ref={audioRef} src="notify.mp3" />
      <div className="h-[80vh] bg-gray-100 rounded px-2 py-2 pb-4 overflow-scroll flex flex-col gap-2 overflow-auto">
        {conversation?.length == 0 && (
          <h2 className="text-red-500">No Message Found</h2>
        )}

        {conversation?.map((msg) => {
          return (
            <Message data={{msg, user, receiver}} />
          );
        })}
        <span ref={bottomRef} id="bottom"></span>
      </div>

      {/* Message Typing Form */}
      <div className="bg-white fixed bottom-0 py-8 right-0 left-0 px-4 md:mx-28">
        <h4 className="mb-2 text-sm">🖐️💬 You are chating with <span className="text-blue-800">{receiver?.data?.name}</span></h4>
        <div className="flex justify-between">
          <textarea
            id="messageInput"
            onChange={handleMessageInput}
            placeholder="Message"
            className="bg-gray-200 rounded h-10 w-[90%] outline-0 px-2 resize-none"
            type="text"
            value={messageText}
          />
          <button
            disabled={!messageText}
            onClick={(e) => sendMessage(e)}
            className="text-purple-600 disabled:text-gray-300 text-2xl px-2 rounded"
          >
            <BiSolidSend />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatUi;
