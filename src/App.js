import React from "react";
import { connect } from "react-redux";
import * as allActions from "./action";
import "./styles/app.scss";
import "./styles/colors.scss";
import Tabs from "./components/tabs";
import Editor from "./components/editor";
const mapDispatchToProps = {
  ...allActions,
};

const mapStateToProps = (state) => {
  return { ...state };
};

const App = () => {
  return (
    <div className="app-wrapper">
      <section className="editor-wrapper">
        <Tabs />
        <Editor />
      </section>
      <section className="chat-bot-wrapper">lol</section>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
