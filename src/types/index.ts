import { ReactNode } from "react";

interface EditorState {
  firstElementId: string | null;
  activeElementId: string | null;
  elements: {
    [key: string]: Node;
  };
}

interface RowNode {
  type: NodeType.Row;
  next: string | null;
  children: string[];
}

interface ColumnNode {
  type: NodeType.Column;
  parent: string;
  content: {
    type: ColumnType;
    value: string;
  };
  options?: {
    align: TextAlign;
  };
}

type TextAlign = "left" | "right" | "center";

type Node = RowNode | ColumnNode;

enum NodeType {
  Row = "row",
  Column = "column",
}

enum ColumnType {
  Empty = "empty",
  Text = "text",
  Image = "image",
}

interface EditorProviderProps {
  children: ReactNode;
}

export type { EditorState, RowNode, ColumnNode, TextAlign, Node, EditorProviderProps };
export { NodeType, ColumnType };
