import { memo } from "react";
import { Handle, Position, NodeResizer, NodeProps } from "@xyflow/react";
import { TShelfNode } from "../App";

const ResizableNode = ({ id, data }: NodeProps<TShelfNode>) => {
  return (
    <div className="bg-ic-light w-full h-full flex justify-center items-center">
      <NodeResizer minWidth={100} minHeight={30} />
      {/*Handle cái chấm dùng để nối các node */}
      <Handle type="target" position={Position.Left} />
      <div id={id} className="p-3 text-center">
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(ResizableNode);
