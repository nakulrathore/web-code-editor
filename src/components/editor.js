import React, { memo, useRef } from "react";
import MonacoEditor from "react-monaco-editor";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentCodeStorage } from "../store";
import { updateCodeCurrentVersion, saveCode } from "../action";

const Editor = () => {
  const codeValue = useSelector(getCurrentCodeStorage);
  const editorRef = useRef();
  const actionDispatcher = useDispatch();

  const initialCode = codeValue;
  const options = {
    scrollbar: {
      useShadows: false,
      verticalScrollbarSize: 0,
      vertical: "hidden",
      horizontal: "hidden",
    },
    minimap: { enabled: false },
    parameterHints: { enabled: true },
    scrollBeyondLastLine: false,
    renderLineHighlight: "none",
    //   renderSideBySide: false, <- for diff
  };

  const onChange = (val, e) => {
    actionDispatcher(updateCodeCurrentVersion(+new Date())); //sets unix timestamp as current version
  };

  const handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (
      (event.ctrlKey && charCode === "s") ||
      (event.metaKey && charCode === "s")
    ) {
      event.preventDefault();
      const currentEditorCodeValue = editorRef.current.editor.getValue();
      actionDispatcher(saveCode(currentEditorCodeValue));
    }
  };

  return (
    <section className="editor" onKeyDown={handleKeyDown}>
      <MonacoEditor
        width="100%"
        height="100%"
        language="javascript"
        theme="vs-dark"
        value={initialCode}
        options={options}
        onChange={onChange}
        ref={editorRef}
      />
    </section>
  );
};

export default memo(Editor);
