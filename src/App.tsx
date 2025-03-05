import { useEffect, useState } from "react";
import GridTable from "./components/grid-table";
import Navbar from "./components/navbar";
import ShelfForm from "./components/shelf-form";
import { Node } from "@xyflow/react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import BinsList from "./components/bins-list";
import BinForm from "./components/bin-form";

export type TFormType =
  | "createShelf"
  | "updateShelf"
  | "createBin"
  | "updateBin"
  | "";

export type TShelfNode = Node<{
  shelfCode?: string;
  location?: string;
  index?: number;
  parentId?: string;
  label: string;
  zone: string;
  row: number;
  level: number;
  // nodesChildId: string[];
}>;

export type TFormData = {
  shelfCode?: string;
  location?: string;
  index?: number;
  parentId?: string;
  zone: string;
  row: number;
  level: number;
  length: number;
  width: number;
  startX: number;
  startY: number;
};

const initialNodes: TShelfNode[] = [
  {
    // label là data trong cái hình ấy
    id: "1",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      label: "A-1",
      zone: "A",
      row: 1,
      level: 5,
      shelfCode: "A-1",
      // nodesChildId: [],
    },
    position: { x: 0, y: 0 },
    width: 300,
    height: 300,
    // style: { zIndex: 1 },
  },
  {
    id: "2",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      label: "B-1",
      zone: "B",
      row: 1,
      level: 2,
      shelfCode: "B-1",
      // nodesChildId: [],
    },
    position: { x: 100, y: 100 },
    width: 300,
    height: 300,
    // style: { zIndex: 1 },
  },
  {
    // label là data trong cái hình ấy
    id: "3",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      location: "A-1-1-1",
      label: "A-1-1-1",
      zone: "A",
      row: 1,
      level: 1,
      index: 1,
      parentId: "1",
      shelfCode: "A-1",
    },
    position: { x: 0, y: 0 },
    width: 150,
    height: 40,
    parentId: "1",
    extent: "parent",
    // style: { zIndex: 1 },
  },
  {
    // label là data trong cái hình ấy
    id: "4",
    type: "resizableNode", // type này tự định nghĩa thôi
    data: {
      location: "B-1-2-1",
      label: "B-1-2-1",
      zone: "B",
      row: 1,
      level: 2,
      index: 1,
      parentId: "2",
      shelfCode: "B-1",
    },
    position: { x: 0, y: 0 },
    width: 150,
    height: 40,
    parentId: "2",
    extent: "parent",
    // style: { zIndex: 1 },
  },
];

function App() {
  const [nodes, setNodes] = useState<TShelfNode[]>(initialNodes); // original
  const [filterNodes, setFilterNodes] = useState<TShelfNode[]>(initialNodes); // coppy + filter
  const [formData, setFormData] = useState<TFormData | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [formTypes, setFormTypes] = useState<TFormType>("");
  const [currentLevel, setCurrentLevel] = useState(1);

  useEffect(() => {
    const firstRender = nodes.filter((node) => {
      return node.data.level == 1 || !node.extent;
    });
    setFilterNodes(firstRender);
  }, []);

  useEffect(() => {
    setFilterNodes(
      nodes.filter((node) => {
        return node.data.level == currentLevel || !node.extent;
      })
    );
  }, [nodes, currentLevel]);

  return (
    <div className="flex justify-center">
      <div className="flex gap-1 w-full min-h-screen">
        <div
          className={twMerge(
            clsx("flex flex-col min-w-[70%]", formTypes == "" && "w-full")
          )}
        >
          <Navbar
            setFormData={setFormData}
            setFormTypes={setFormTypes}
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
            nodes={nodes}
          />
          <GridTable
            setFormData={setFormData}
            setFormTypes={setFormTypes}
            setSelectedNodeId={setSelectedNodeId}
            nodes={nodes}
            setNodes={setNodes}
            filterNodes={filterNodes}
            setFilterNodes={setFilterNodes}
          />
        </div>
        {formTypes && (
          <div className="w-[30%] h-full border bg-ic-white-6s space-y-3">
            {["createShelf", "updateShelf"].includes(formTypes) && (
              <ShelfForm
                formData={formData}
                // setFormData={setFormData}
                formTypes={formTypes}
                setFormTypes={setFormTypes}
                selectedNodeId={selectedNodeId}
                nodes={nodes}
                setNodes={setNodes}
                setFilterNodes={setFilterNodes}
              />
            )}

            {formTypes == "updateShelf" && (
              <BinsList
                setFormTypes={setFormTypes}
                nodes={nodes}
                selectedNodeId={selectedNodeId}
                setSelectedNodeId={setSelectedNodeId}
                setFormData={setFormData}
              />
            )}

            {["createBin", "updateBin"].includes(formTypes) && (
              <BinForm
                formData={formData}
                setFormData={setFormData}
                setFormTypes={setFormTypes}
                nodes={nodes}
                setNodes={setNodes}
                formTypes={formTypes}
                selectedNodeId={selectedNodeId}
                setFilterNodes={setFilterNodes}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
