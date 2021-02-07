import React from "react";
import { connect } from "react-redux";

// styles
import "./styles/app.scss";
import "./styles/colors.scss";

// components
import Tabs from "./components/tabs";
import Editor from "./components/editor";
import ChatBox from "./components/chatBox";

// actions
import * as allActions from "./action";
const mapDispatchToProps = {
  ...allActions,
};

const mapStateToProps = (state) => {
  console.log("state::", state);
  return { ...state };
};

const App = () => {
  return (
    <div className="app-wrapper">
      <section className="editor-wrapper">
        <Tabs />
        <Editor />
      </section>
      <section className="chat-bot-wrapper">
        <ChatBox />
      </section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
