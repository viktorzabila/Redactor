import React, { FC } from "react";

import { Stage } from "../stage";
import { renderRowsRecursively } from "../../utils/render-rows";
import { useEditorContext } from "../../store";
import { Settings } from "../settings";

const Editor: FC = () => {
  const { firstElementId, activeElementId, elements, setActiveElement } = useEditorContext();

  return (
    <div className="editor">
      <Stage onSelect={() => setActiveElement(null)}>
        {renderRowsRecursively(firstElementId, elements, activeElementId, setActiveElement)}
      </Stage>
      <Settings />
    </div>
  );
};

export { Editor };
