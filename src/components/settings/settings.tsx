import { FC, useEffect, useState } from "react";
import { Icons } from "../icons";
import { useEditorContext } from "../../store";
import { ColumnType, NodeType, TextAlign } from "../../types";

const Settings: FC = () => {
  const { activeElementId, elements, addRow, addColumn, setColumnType, setColumnValue, setColumnTextAlign } =
    useEditorContext();

  const currentElement = activeElementId ? elements[activeElementId] : null;
  const [inputValue, setInputValue] = useState<string>();

  useEffect(() => {
    if (currentElement?.type === NodeType.Column && inputValue !== currentElement.content.value) {
      setInputValue(currentElement.content.value);
    }
  }, [currentElement, inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (currentElement?.type === NodeType.Column) {
      setColumnValue(value);
    }
  };

  const handleAddElement = (type: "row" | "column") => {
    if (type === "row") {
      addRow();
    } else {
      addColumn();
    }
  };

  const handleColumnTypeChange = (type: ColumnType) => {
    if (currentElement?.type === NodeType.Column && currentElement.content.type !== type) {
      setColumnType(type);
      setInputValue("");
    }
  };

  const handleColumnTextAlignChange = (align: TextAlign) => {
    if (currentElement?.type === NodeType.Column) {
      setColumnTextAlign(align);
    }
  };

  if (!currentElement) {
    return (
      <div className="properties">
        <div className="section">
          <div className="section-header">Page</div>
          <div className="actions">
            <button className="action" onClick={() => handleAddElement("row")}>
              Add row
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="properties">
      <div className="section">
        <div className="section-header">Page</div>
        <div className="actions">
          <button className="action" onClick={() => handleAddElement("row")}>
            Add row
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-header">Row</div>
        <div className="actions">
          <button className="action" onClick={() => handleAddElement("column")}>
            Add column
          </button>
        </div>
      </div>

      {currentElement.type === NodeType.Column && (
        <div className="section">
          <div className="section-header">Column</div>
          <div className="button-group-field">
            <label>Contents</label>
            <div className="button-group">
              <button
                className={currentElement.content.type === ColumnType.Text ? "selected" : ""}
                onClick={() => handleColumnTypeChange(ColumnType.Text)}
              >
                <Icons.Text />
              </button>
              <button
                className={currentElement.content.type === ColumnType.Image ? "selected" : ""}
                onClick={() => handleColumnTypeChange(ColumnType.Image)}
              >
                <Icons.Image />
              </button>
            </div>
          </div>

          {currentElement.content.type === ColumnType.Text && (
            <div className="section">
              <div className="section-header">Text</div>
              <div className="button-group-field">
                <label>Alignment</label>
                <div className="button-group">
                  <button
                    className={currentElement.options?.align === "left" ? "selected" : ""}
                    onClick={() => handleColumnTextAlignChange("left")}
                  >
                    <Icons.TextAlignLeft />
                  </button>
                  <button
                    className={currentElement.options?.align === "center" ? "selected" : ""}
                    onClick={() => handleColumnTextAlignChange("center")}
                  >
                    <Icons.TextAlignCenter />
                  </button>
                  <button
                    className={currentElement.options?.align === "right" ? "selected" : ""}
                    onClick={() => handleColumnTextAlignChange("right")}
                  >
                    <Icons.TextAlignRight />
                  </button>
                </div>
              </div>
              <div className="textarea-field">
                <textarea rows={8} placeholder="Enter text" onChange={handleInputChange} value={inputValue} />
              </div>
            </div>
          )}

          {currentElement.content.type === ColumnType.Image && (
            <div className="section">
              <div className="section-header">Image</div>
              <div className="text-field">
                <label htmlFor="image-url">URL</label>
                <input id="image-url" type="text" onChange={handleInputChange} value={inputValue} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Settings };
