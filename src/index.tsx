import ReactDOM from "react-dom/client";
import { Editor } from "./components/editor";
import { EditorProvider } from "./store/editor-context";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <EditorProvider>
    <Editor />
  </EditorProvider>
);
