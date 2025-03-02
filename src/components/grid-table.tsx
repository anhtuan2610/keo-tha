import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  // Node,
  OnNodesChange,
  NodeMouseHandler,
  // NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef } from "react";
import resizableNode from "../../src/components/resizable-node";
import { TFormData, TShelfNode } from "../App";

export const nodeTypes = {
  // component mapping in object // sử dụng một object(nodeTypes) để chứa các component tương ứng với từng key, rồi lấy ra component dựa trên key đó
  resizableNode,
};

const GridTable = ({
  setFormData,
  setSelectedShelfId,
  setIsShowAddBinForm,
  setIsShowShelfForm,
  setIsUpdateForm,
  nodes,
  setNodes,
}: {
  setFormData: React.Dispatch<React.SetStateAction<TFormData | null>>;
  setSelectedShelfId: React.Dispatch<React.SetStateAction<string | null>>;
  setIsShowAddBinForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowShelfForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
  nodes: TShelfNode[];
  setNodes: React.Dispatch<React.SetStateAction<TShelfNode[]>>;
}) => {
  const lastSelectedNodeId = useRef<string | null>(null);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      // changes có 3 trạng thái, trạng thái tĩnh/thay đổi kích thước (type là dimensions , trạng thái này bao gồm 1 mảng gồm các node đang có) và // ở trạng thái này chỉ có data chiều dài chiều rộng
      // trạng thái vừa được chọn vào (type là selected)
      // trạng thái di chuyển (type là position, trạng thái này cũng là 1 mảng nhưng chỉ bao gồm 1 node là node đang di chuyển) // ở trạng thái này chỉ có data vị trí x y
      {
        // const newNodes = applyNodeChanges(changes, nodes);
        if (changes[0].type) {
          // type là position hoặc selected thì node(duy nhất) mới chính thức đang được pick và di chuyển
          if (lastSelectedNodeId.current !== changes[0].id) {
            // set dimensions // không có điều kiện thì vẫn đúng nhưng không tối ưu (đang cập nhật lại length width mặc dù vẫn đang chỉ pick 1 thằng (chỉ nên cập nhật lại khi pick thằng khác))
            nodes.forEach((node) => {
              if (changes[0].id == node.id) {
                // bốc đúng thằng đang được chọn ở trong nodes
                setFormData({
                  // shelfCode: node.data.shelfCode, // hết lỗi nhảy chữ?
                  zone: node.data.zone,
                  row: node.data.row,
                  level: node.data.level,
                  length: node.height ?? 0,
                  width: node.width ?? 0,
                  startX: node.position.x,
                  startY: node.position.y,
                });
                setIsShowShelfForm(true);
                return;
              }
            });
            // console.log("set width");
            lastSelectedNodeId.current = changes[0].id;
          }
          setSelectedShelfId(changes[0].id);
          setIsUpdateForm(true);
          setIsShowAddBinForm(false);
          if (changes[0].type == "position" || changes[0].type == "selected") {
            setFormData(
              (prev) =>
                ({
                  ...prev, // length, width, shelf code
                  startX: changes[0].position.x,
                  startY: changes[0].position.y,
                } as TFormData)
            );
          }
          if (changes[0].type == "dimensions" && changes[0].resizing) {
            setFormData(
              (prev) =>
                ({
                  ...prev, // length, width, shelf code
                  length: changes[0].dimensions.height.toString(),
                  width: changes[0].dimensions.width.toString(),
                } as TFormData)
            );
          }
        }
        setNodes((nodes) => applyNodeChanges(changes, nodes));
      },
    [nodes, lastSelectedNodeId]
  );

  const handleNodeClick: NodeMouseHandler = (_e, nodeSelect) => {
    const nodeFind = nodes.find((node) => node.id == nodeSelect.id);
    if (nodeFind) {
      setSelectedShelfId(nodeSelect.id);
      setIsUpdateForm(true);
      setIsShowAddBinForm(false);
      setIsShowShelfForm(true);
      setFormData({
        shelfCode: nodeFind.data.shelfCode,
        zone: nodeFind.data.zone,
        row: nodeFind.data.row,
        level: nodeFind.data.level,
        length: nodeFind.height ?? 0,
        width: nodeFind.width ?? 0,
        startX: nodeFind.position.x,
        startY: nodeFind.position.y,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex"></div>
      <div className="h-screen">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          onNodeClick={handleNodeClick} // click này là click vào cả cái lưới nếu click trúng cái node thì event ...
          nodeTypes={nodeTypes} // khi khai báo như vậy tức là node sẽ được render theo cái component mà cái type trùng với thuộc tính trong object đã khai báo
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default GridTable;
