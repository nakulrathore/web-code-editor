import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// styles
import "../styles/chatBox.scss";

// assets
import avatarUser from "../assets/avatar-user.png";
import avatarBot from "../assets/avatar-bot.png";

// actions
import { sendMessage } from "../action";

// store
import { getMessages } from "../store";

const ChatBox = () => {
  const actionDispatcher = useDispatch();
  const allMessages = useSelector(getMessages);

  const handleChatInput = (event) => {
    event.preventDefault();
    const msgValue = event.target.elements.msg.value;
    event.target.reset();
    actionDispatcher(sendMessage(msgValue));
  };
  return (
    <>
      <section className="messages-view">
        {allMessages.map((message, index) => {
          return <RenderMessage key={index} message={message} />;
        })}
      </section>
      <form className="chat-input" onSubmit={handleChatInput}>
        <input
          type="text"
          autoComplete="off"
          placeholder="write & press enter"
          name="msg"
        />
      </form>
    </>
  );
};

const RenderMessage = ({ message }) => {
  const ref = useRef();

  const { sent, reply } = message;
  console.log("text", message);
  const { text: sentText } = sent;
  const { text: receivedText, status: receivedStatus } = reply;

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);
  return (
    <div className="sent-and-reply" ref={ref}>
      <div className="msg sent">
        <img src={avatarUser} alt="user" />

        <div className="msg-text">{sentText}</div>
      </div>
      <div className="msg reply">
        <img src={avatarBot} alt="user" />
        <div className="msg-text">
          {receivedStatus === "loading" ? (
            <div className="loading">•</div>
          ) : receivedStatus === "received" ? (
            receivedText
          ) : (
            "Error : I'm just a teapot :("
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
