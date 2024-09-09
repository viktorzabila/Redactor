import { ColumnType, EditorState, NodeType, RowNode } from "../types";
import { createNewColumn, createNewRow } from "../utils/editor-utils";
import { Action, ActionType } from "./action";

const editorReducer = (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case ActionType.ADD_ROW: {
      const newElements = {
        ...state.elements,
        [action.rowHash]: createNewRow(),
      };

      if (state.firstElementId === null) {
        return {
          ...state,
          firstElementId: action.rowHash,
          activeElementId: action.rowHash,
          elements: newElements,
        };
      } else {
        const lastElementId = Object.keys(state.elements).find(
          (key) => state.elements[key].type === NodeType.Row && !(state.elements[key] as RowNode).next
        );

        if (lastElementId) {
          return {
            ...state,
            activeElementId: action.rowHash,
            elements: {
              ...newElements,
              [lastElementId]: { ...state.elements[lastElementId], next: action.rowHash } as RowNode,
            },
          };
        }
      }

      return { ...state, activeElementId: action.rowHash, elements: newElements };
    }

    case ActionType.ADD_COLUMN: {
      const { parentHash, colHash } = action;
      const parentElement = state.elements[parentHash] as RowNode;

      if (parentElement) {
        const updatedParent: RowNode = {
          ...parentElement,
          children: [...(parentElement.children ?? []), colHash],
        };

        return {
          ...state,
          activeElementId: colHash,
          elements: {
            ...state.elements,
            [parentHash]: updatedParent,
            [colHash]: createNewColumn(ColumnType.Empty, parentHash),
          },
        };
      }

      return state;
    }

    case ActionType.SET_COLUMN_VALUE: {
      const column = state.elements[action.columnHash];
      if (column?.type === NodeType.Column) {
        return {
          ...state,
          elements: {
            ...state.elements,
            [action.columnHash]: {
              ...column,
              content: { ...column.content, value: action.value },
            },
          },
        };
      }
      return state;
    }

    case ActionType.SET_COLUMN_TYPE: {
      const column = state.elements[action.columnHash];
      if (column?.type === NodeType.Column) {
        return {
          ...state,
          elements: {
            ...state.elements,
            [action.columnHash]: {
              ...column,
              content: { type: action.columnType, value: "" },
            },
          },
        };
      }
      return state;
    }

    case ActionType.SET_COLUMN_TEXT_ALIGN: {
      const column = state.elements[action.columnHash];
      if (column?.type === NodeType.Column) {
        return {
          ...state,
          elements: {
            ...state.elements,
            [action.columnHash]: {
              ...column,
              options: { ...column.options, align: action.align },
            },
          },
        };
      }
      return state;
    }

    case ActionType.SET_ACTIVE: {
      return {
        ...state,
        activeElementId: action.activeHash,
      };
    }

    default:
      return state;
  }
};

export { editorReducer };
