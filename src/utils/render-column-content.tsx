import React from "react";
import { Markdown } from "../components/markdown";
import { ImagePlaceholder } from "../components/image-placeholder";
import { ColumnType, Node, NodeType } from "../types";

const renderColumnContent = (node: Node) => {
  if (node.type !== NodeType.Column) return null;

  switch (node.content.type) {
    case ColumnType.Text:
      return <Markdown className={`text-align-${node.options?.align || "left"}`}>{node.content.value}</Markdown>;
    case ColumnType.Image:
      return node.content.value ? <img src={node.content.value} alt="placeholder" /> : <ImagePlaceholder />;
    default:
      return null;
  }
};

export { renderColumnContent };
