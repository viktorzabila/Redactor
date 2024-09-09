import { RowNode, ColumnType, NodeType, ColumnNode } from "../types";

const createHash = (type: NodeType): string => {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const timestampPart = performance.now().toString(36).replace(".", "");
  return `${type}-${timestampPart}-${randomPart}`;
};

const createNewRow = (): RowNode => ({
  type: NodeType.Row,
  next: null,
  children: [],
});

const createNewColumn = (type: ColumnType, parent: string): ColumnNode => {
  switch (type) {
    case ColumnType.Image:
    case ColumnType.Text:
      return {
        type: NodeType.Column,
        parent,
        content: {
          type,
          value: "",
        },
        options: type === ColumnType.Text ? { align: "left" } : undefined,
      };
    default:
      return {
        type: NodeType.Column,
        parent,
        content: {
          type: ColumnType.Empty,
          value: "",
        },
      };
  }
};

export { createHash, createNewRow, createNewColumn };
