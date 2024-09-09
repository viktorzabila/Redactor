import { ColumnType, TextAlign } from "../types";

enum ActionType {
  ADD_ROW = "ADD_ROW",
  ADD_COLUMN = "ADD_COLUMN",
  SET_COLUMN_VALUE = "SET_COLUMN_VALUE",
  SET_COLUMN_TYPE = "SET_COLUMN_TYPE",
  SET_COLUMN_TEXT_ALIGN = "SET_COLUMN_TEXT_ALIGN",
  SET_ACTIVE = "SET_ACTIVE",
}

type Action =
  | { type: ActionType.ADD_ROW; rowHash: string }
  | { type: ActionType.ADD_COLUMN; colHash: string; parentHash: string }
  | { type: ActionType.SET_COLUMN_VALUE; value: string; columnHash: string }
  | { type: ActionType.SET_COLUMN_TYPE; columnType: ColumnType; columnHash: string }
  | { type: ActionType.SET_COLUMN_TEXT_ALIGN; align: TextAlign; columnHash: string }
  | { type: ActionType.SET_ACTIVE; activeHash: string | null };

export { ActionType };
export type { Action };
