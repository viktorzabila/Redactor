import React, { createContext, useContext, FC, useReducer } from "react";
import { ActionType } from "./action";
import { ColumnType, EditorProviderProps, EditorState, NodeType, TextAlign } from "../types";
import { editorReducer } from ".";
import { createHash } from "../utils/editor-utils";

const EditorContext = createContext<
  | (EditorState & {
      setActiveElement: (selectedHash: string | null) => void;
      addRow: () => void;
      addColumn: () => void;
      setColumnValue: (value: string) => void;
      setColumnType: (type: ColumnType) => void;
      setColumnTextAlign: (align: TextAlign) => void;
    })
  | undefined
>(undefined);

const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};

const EditorProvider: FC<EditorProviderProps> = ({ children }) => {
  const initialState: EditorState = {
    firstElementId: null,
    activeElementId: null,
    elements: {},
  };
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const addRow = () => {
    const rowHash = createHash(NodeType.Row);
    dispatch({ type: ActionType.ADD_ROW, rowHash });
  };

  const addColumn = () => {
    if (!state.activeElementId) return;

    const selectedElement = state.elements[state.activeElementId];
    const colHash = createHash(NodeType.Column);
    let parentHash = state.activeElementId;

    if (selectedElement?.type === NodeType.Column) {
      parentHash = selectedElement.parent;
    }

    dispatch({ type: ActionType.ADD_COLUMN, colHash, parentHash });
  };

  const setColumnValue = (value: string) => {
    if (state.activeElementId) {
      dispatch({ type: ActionType.SET_COLUMN_VALUE, value, columnHash: state.activeElementId });
    }
  };

  const setColumnType = (type: ColumnType) => {
    if (state.activeElementId) {
      dispatch({ type: ActionType.SET_COLUMN_TYPE, columnType: type, columnHash: state.activeElementId });
    }
  };

  const setColumnTextAlign = (align: TextAlign) => {
    if (state.activeElementId) {
      dispatch({ type: ActionType.SET_COLUMN_TEXT_ALIGN, align, columnHash: state.activeElementId });
    }
  };

  const setActiveElement = (activeHash: string | null) => {
    dispatch({ type: ActionType.SET_ACTIVE, activeHash });
  };

  return (
    <EditorContext.Provider
      value={{
        ...state,
        setActiveElement,
        addRow,
        addColumn,
        setColumnValue,
        setColumnType,
        setColumnTextAlign,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { useEditorContext, EditorProvider };
