import React from "react";
import { Column } from "../components/column";
import { Row } from "../components/row";
import { Node, RowNode } from "../types";
import { renderColumnContent } from "./render-column-content";

const renderRowsRecursively = (
  currentID: string | null,
  elements: Record<string, Node>,
  selected: string | null,
  setSelected: (id: string | null) => void
): JSX.Element[] => {
  if (!currentID) return [];

  const currentNode = elements[currentID] as RowNode;
  const columns = currentNode.children.map((childID) => (
    <Column selected={selected === childID} key={childID} onSelect={() => setSelected(childID)}>
      {renderColumnContent(elements[childID])}
    </Column>
  ));

  return [
    <Row selected={selected === currentID} key={currentID} onSelect={() => setSelected(currentID)}>
      {columns}
    </Row>,
    ...renderRowsRecursively(currentNode.next, elements, selected, setSelected),
  ];
};

export { renderRowsRecursively };
